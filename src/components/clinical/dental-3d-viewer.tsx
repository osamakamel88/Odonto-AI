'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { 
  generateFullDentition3D, 
  interpolateToothTransform, 
  Tooth3DData, 
  TOOTH_NAMES 
} from '@/lib/orthodontics/dental-3d-geometry';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Maximize2, 
  RotateCcw, 
  Eye, 
  Sliders, 
  Layers, 
  Upload, 
  Check, 
  Sparkles, 
  Info,
  Ruler,
  Compass
} from 'lucide-react';

type CameraPreset = 'default' | 'frontal' | 'maxillary' | 'mandibular' | 'right_buccal' | 'left_buccal';
type ArchMode = 'occlusion' | 'separated' | 'maxilla_only' | 'mandible_only';

interface Dental3DViewerProps {
  onSelectTooth?: (fdi: number) => void;
  selectedFdi?: number | null;
}

export function Dental3DViewer({ onSelectTooth, selectedFdi }: Dental3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const toothMeshesRef = useRef<Map<number, THREE.Mesh>>(new Map());
  const maxBaseMeshRef = useRef<THREE.Mesh | null>(null);
  const mandBaseMeshRef = useRef<THREE.Mesh | null>(null);
  const stlMeshRef = useRef<THREE.Mesh | null>(null);

  // Clinical interactive states
  const [alignmentProgress, setAlignmentProgress] = useState<number>(0); // 0 = crowded, 1 = ideal aligned
  const [archMode, setArchMode] = useState<ArchMode>('occlusion');
  const [activePreset, setActivePreset] = useState<CameraPreset>('default');
  const [inspectedTooth, setInspectedTooth] = useState<Tooth3DData | null>(null);
  const [customStlLoaded, setCustomStlLoaded] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const dentition = useMemo(() => generateFullDentition3D(), []);

  // Sync external selectedFdi
  useEffect(() => {
    if (selectedFdi) {
      const t = dentition.find(d => d.fdi === selectedFdi);
      if (t) setInspectedTooth(t);
    }
  }, [selectedFdi, dentition]);

  // Setup Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate-900 clinical backdrop
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 20;
    controls.minDistance = 2;
    controlsRef.current = controls;

    // Lighting (Dental Operatory Studio Rig)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.8);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.6, 20);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Enamel Material (Physical PBR shader with translucency)
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.16,
      metalness: 0.04,
      transmission: 0.18,
      ior: 1.55,
      reflectivity: 0.7,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1
    });

    // Gingiva / Plaster Base Material (Natural Anatomical Soft Tissue Rose)
    const gingivaMaterial = new THREE.MeshStandardMaterial({
      color: 0xc86f7f,
      roughness: 0.55,
      metalness: 0.05
    });

    // Create Teeth Meshes
    toothMeshesRef.current.clear();

    dentition.forEach((tooth) => {
      let geo: THREE.BufferGeometry;
      const w = tooth.mesiodistalWidthMm * 0.07;
      const h = tooth.crownHeightMm * 0.07;
      const d = tooth.buccolingualDepthMm * 0.07;

      if (tooth.type === 'incisor_central' || tooth.type === 'incisor_lateral') {
        // Chisel-shaped incisor crown
        geo = new THREE.BoxGeometry(w, h, d * 0.65);
      } else if (tooth.type === 'canine') {
        // Pointed cusp canine crown
        geo = new THREE.ConeGeometry(w * 0.55, h, 6);
        geo.rotateX(Math.PI);
      } else if (tooth.type === 'premolar') {
        // Bicuspid rounded cylinder
        geo = new THREE.CylinderGeometry(w * 0.45, w * 0.48, h, 8);
      } else {
        // Molar with occlusal table
        geo = new THREE.BoxGeometry(w, h, d);
      }

      const mesh = new THREE.Mesh(geo, enamelMaterial.clone());
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { fdi: tooth.fdi, tooth };

      // Initial placement
      const transform = interpolateToothTransform(tooth, 0, 0);
      mesh.position.set(...transform.pos);
      mesh.rotation.set(...transform.rot);

      scene.add(mesh);
      toothMeshesRef.current.set(tooth.fdi, mesh);
    });

    // Create Arch Alveolar Bases
    const createArchBase = (isMax: boolean) => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        isMax ? 2.3 : 2.1,
        isMax ? 2.5 : 2.3,
        0, Math.PI,
        false, 0
      );
      const points = curve.getPoints(32);
      const shape = new THREE.Shape(points.map(p => new THREE.Vector2(p.x, p.y)));
      const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.1, bevelThickness: 0.1 };
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.rotateX(-Math.PI / 2);

      const baseMesh = new THREE.Mesh(geo, gingivaMaterial);
      baseMesh.position.set(0, isMax ? 1.0 : -1.0, 0.4);
      scene.add(baseMesh);
      return baseMesh;
    };

    maxBaseMeshRef.current = createArchBase(true);
    mandBaseMeshRef.current = createArchBase(false);

    // Raycaster for tooth picking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(toothMeshesRef.current.values()));

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const toothData = hit.userData?.tooth as Tooth3DData;
        if (toothData) {
          setInspectedTooth(toothData);
          if (onSelectTooth) onSelectTooth(toothData.fdi);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      resizeObserver.disconnect();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [dentition, onSelectTooth]);

  // Update tooth positions when alignmentProgress or archMode changes
  useEffect(() => {
    let sepOffset = 0;
    if (archMode === 'separated') sepOffset = 1.2;

    dentition.forEach((tooth) => {
      const mesh = toothMeshesRef.current.get(tooth.fdi);
      if (!mesh) return;

      // Visibility based on arch mode
      if (archMode === 'maxilla_only') {
        mesh.visible = tooth.arch === 'maxillary';
      } else if (archMode === 'mandible_only') {
        mesh.visible = tooth.arch === 'mandibular';
      } else {
        mesh.visible = true;
      }

      // Compute interpolated transform
      const transform = interpolateToothTransform(tooth, alignmentProgress, sepOffset);
      mesh.position.set(...transform.pos);
      mesh.rotation.set(...transform.rot);

      // Highlight inspected tooth
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      if (inspectedTooth && inspectedTooth.fdi === tooth.fdi) {
        mat.emissive.setHex(0x3b82f6);
        mat.emissiveIntensity = 0.6;
      } else {
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0.0;
      }
    });

    // Update arch base meshes
    if (maxBaseMeshRef.current) {
      maxBaseMeshRef.current.visible = archMode !== 'mandible_only';
      maxBaseMeshRef.current.position.y = 1.0 + (archMode === 'separated' ? 1.2 : 0);
    }
    if (mandBaseMeshRef.current) {
      mandBaseMeshRef.current.visible = archMode !== 'maxilla_only';
      mandBaseMeshRef.current.position.y = -1.0 - (archMode === 'separated' ? 1.2 : 0);
    }
  }, [alignmentProgress, archMode, inspectedTooth, dentition]);

  // Camera Presets
  const setCameraView = (preset: CameraPreset) => {
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl) return;

    setActivePreset(preset);
    ctrl.target.set(0, 0, 0);

    switch (preset) {
      case 'frontal':
        cam.position.set(0, 0, 8.5);
        break;
      case 'maxillary':
        cam.position.set(0, 8.5, -0.5);
        break;
      case 'mandibular':
        cam.position.set(0, -8.5, -0.5);
        break;
      case 'right_buccal':
        cam.position.set(8.5, 0, 0);
        break;
      case 'left_buccal':
        cam.position.set(-8.5, 0, 0);
        break;
      default:
        cam.position.set(0, 3.5, 7.5);
        break;
    }
    ctrl.update();
  };

  // Play animation toggle
  const togglePlayAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      return;
    }
    setIsAnimating(true);
    let cur = alignmentProgress;
    let step = 0.015;

    const interval = setInterval(() => {
      cur += step;
      if (cur >= 1.0) {
        cur = 1.0;
        step = -0.015;
      } else if (cur <= 0.0) {
        cur = 0.0;
        step = 0.015;
      }
      setAlignmentProgress(Math.round(cur * 100) / 100);
    }, 40);

    // Clean up when stopping
    const stop = () => {
      clearInterval(interval);
      setIsAnimating(false);
    };
    setTimeout(stop, 6000);
  };

  // Handle Custom STL Upload
  const handleStlUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sceneRef.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      if (!buffer) return;

      const loader = new STLLoader();
      const geometry = loader.parse(buffer);
      geometry.computeVertexNormals();
      geometry.center();

      // Remove existing custom STL if any
      if (stlMeshRef.current && sceneRef.current) {
        sceneRef.current.remove(stlMeshRef.current);
      }

      // Hide procedural teeth
      toothMeshesRef.current.forEach(m => (m.visible = false));
      if (maxBaseMeshRef.current) maxBaseMeshRef.current.visible = false;
      if (mandBaseMeshRef.current) mandBaseMeshRef.current.visible = false;

      const mat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.25,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.scale.set(0.1, 0.1, 0.1);
      if (sceneRef.current) {
        sceneRef.current.add(mesh);
      }
      stlMeshRef.current = mesh;

      setCustomStlLoaded(file.name);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 3D Viewport Console Card */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        {/* Dedicated Top Toolbar: Camera Presets & STL Import */}
        <div className="bg-slate-900 border-b border-slate-800/80 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 pr-2 shrink-0 border-r border-slate-800">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              Camera:
            </span>
            <button
              onClick={() => setCameraView('default')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                activePreset === 'default' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              3/4 Orbit
            </button>
            <button
              onClick={() => setCameraView('frontal')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                activePreset === 'frontal' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Frontal
            </button>
            <button
              onClick={() => setCameraView('maxillary')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                activePreset === 'maxillary' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Upper Arch
            </button>
            <button
              onClick={() => setCameraView('mandibular')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                activePreset === 'mandibular' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Lower Arch
            </button>
            <button
              onClick={() => setCameraView('right_buccal')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                activePreset === 'right_buccal' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Right
            </button>
            <button
              onClick={() => setCameraView('left_buccal')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                activePreset === 'left_buccal' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Left
            </button>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {customStlLoaded ? (
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px]">
                {customStlLoaded}
              </Badge>
            ) : (
              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs">
                <Upload className="w-3 h-3 text-blue-400" />
                <span>Import Scan</span>
                <input type="file" accept=".stl,.obj" onChange={handleStlUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* 3D WebGL Canvas Container (100% Unobstructed) */}
        <div ref={mountRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing bg-slate-950" />

        {/* Dedicated Bottom Control Strip: Arch Occlusion & Alignment Slider */}
        <div className="bg-slate-900 border-t border-slate-800/80 p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          {/* Arch Separation Switcher */}
          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setArchMode('occlusion')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                archMode === 'occlusion' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              In Occlusion
            </button>
            <button
              onClick={() => setArchMode('separated')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                archMode === 'separated' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Open (25mm)
            </button>
            <button
              onClick={() => setArchMode('maxilla_only')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                archMode === 'maxilla_only' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Maxilla
            </button>
            <button
              onClick={() => setArchMode('mandible_only')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                archMode === 'mandible_only' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mandible
            </button>
          </div>

          {/* Alignment Simulation Slider & Play */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Alignment:
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={alignmentProgress}
              onChange={(e) => setAlignmentProgress(parseFloat(e.target.value))}
              className="w-24 sm:w-36 accent-blue-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-blue-400 min-w-[36px] text-right">
              {Math.round(alignmentProgress * 100)}%
            </span>
            <button
              onClick={togglePlayAnimation}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                isAnimating 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isAnimating ? 'Pause' : 'Auto Play'}
            </button>
          </div>
        </div>
      </div>

      {/* Selected Tooth 3D Bolton Caliper Card */}
      {inspectedTooth && (
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/20 text-slate-200 space-y-3 shadow-md animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/40">
                <Ruler className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Tooth {inspectedTooth.fdi}: {inspectedTooth.name}
                  <Badge variant="outline" className="text-[10px] text-blue-300 border-blue-500/40">
                    FDI ISO 3950
                  </Badge>
                </h4>
                <p className="text-xs text-slate-400">
                  {inspectedTooth.arch === 'maxillary' ? 'Maxillary Upper Arch' : 'Mandibular Lower Arch'} • {inspectedTooth.side === 'right' ? 'Right Quadrant' : 'Left Quadrant'}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setInspectedTooth(null)}
              className="text-xs h-7 border-slate-700 text-slate-400 hover:text-white"
            >
              Clear Selection
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mesiodistal Width:</span>
              <div className="text-sm font-mono font-bold text-emerald-400">
                {inspectedTooth.mesiodistalWidthMm.toFixed(1)} mm
              </div>
              <span className="text-[10px] text-slate-500">Wheeler's Normal</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Crown Height:</span>
              <div className="text-sm font-mono font-bold text-blue-400">
                {inspectedTooth.crownHeightMm.toFixed(1)} mm
              </div>
              <span className="text-[10px] text-slate-500">Incisal to CEJ</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Buccolingual Depth:</span>
              <div className="text-sm font-mono font-bold text-amber-400">
                {inspectedTooth.buccolingualDepthMm.toFixed(1)} mm
              </div>
              <span className="text-[10px] text-slate-500">Labial to Lingual</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Bolton Contribution:</span>
              <div className="text-sm font-bold text-indigo-300">
                {inspectedTooth.type.includes('incisor') || inspectedTooth.type === 'canine' 
                  ? 'Anterior Ratio (6)' 
                  : 'Overall Ratio (12)'}
              </div>
              <span className="text-[10px] text-slate-500">Arch Perimeter Unit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
