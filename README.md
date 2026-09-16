# 🦷 Odonto AI

**AI-Powered Orthodontic Treatment Planning Platform**

Odonto AI is a multi-tenant SaaS application that empowers orthodontists — from fresh graduates to seasoned experts — to generate comprehensive, evidence-based treatment plans using artificial intelligence.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai)

---

## ✨ Features

### 7-Layer AI Architecture

| Layer | Capability | Technology |
|-------|-----------|------------|
| **Layer 1** | Cephalometric Analysis | GPT-4o Vision + Custom Calculations |
| **Layer 2** | Panoramic X-ray Segmentation | GPT-4o Vision + Tooth Detection |
| **Layer 3** | Disease Detection | AI Pathology Detection |
| **Layer 4** | 3D Dental Mesh Analysis | Three.js + AI Segmentation |
| **Layer 5** | CBCT Volume Analysis | Cornerstone3D + AI Segmentation |
| **Layer 6** | Clinical Reasoning | Dental LLM + Chain-of-Thought |
| **Layer 7** | Treatment Plan Generation | AI Orchestration + RAG Evidence |

### Core Features

- 🏥 **Multi-Tenant Architecture** — Clinic-level data isolation with Row-Level Security
- 🤖 **AI Treatment Plans** — Generate complete, staged orthodontic treatment plans
- 📊 **Cephalometric Analysis** — Auto-trace lateral cephs, compute all measurements
- 🦷 **Interactive Tooth Chart** — FDI notation, click to mark conditions
- 📷 **Image Analysis** — AI-powered analysis of clinical photos, OPGs, and cephs
- 📐 **Severity Scoring** — IOTN, PAR Index, Discrepancy Index calculators
- 🔄 **Treatment Comparison** — Side-by-side comparison of alternatives
- 📚 **Knowledge Base** — Comprehensive orthodontic treatment protocols
- 🎓 **Education Mode** — AI explains *why* each treatment decision is made
- 📄 **PDF Export** — Generate professional treatment plan documents

### Orthodontic Knowledge Base

Complete coverage of all treatment modalities:
- Fixed appliances (MBT, Roth, Damon, ceramic, lingual)
- Clear aligners
- Functional appliances (Twin Block, Herbst, Forsus, MARA)
- Expansion devices (RPE, SARPE, MSE)
- Surgical protocols (Le Fort I, BSSO, genioplasty)
- TADs, anchorage devices
- Interceptive/early treatment
- Retention protocols
- Wire sequences and elastic protocols

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/osamakamel88/odonto-ai.git
cd odonto-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ | OpenAI API key for GPT-4o |
| `DATABASE_URL` | ⬜ | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ⬜ | Clerk authentication |
| `CLERK_SECRET_KEY` | ⬜ | Clerk authentication |

> The app works with just the OpenAI key using mock data for development.

### Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
```

---

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Protected dashboard pages
│   │   ├── dashboard/      # Home dashboard
│   │   ├── patients/       # Patient management
│   │   ├── plans/          # Treatment plans
│   │   └── knowledge/      # Knowledge base browser
│   └── api/                # API routes
│       └── ai/             # AI endpoints
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── clinical/           # Clinical components
│   └── layout/             # Layout components
└── lib/
    ├── ai/                 # AI integration layer
    │   ├── prompts/        # System prompts
    │   ├── cv/             # Computer vision clients
    │   └── orchestrator.ts # Central AI coordinator
    ├── db/                 # Database schema & mock data
    └── orthodontics/       # Domain logic
        ├── knowledge-base/ # Treatment protocols
        ├── cephalometrics  # Ceph calculations
        ├── classification  # Orthodontic classification
        └── severity-indices # Scoring systems
```

---

## 🛡️ Compliance

> ⚠️ **Medical AI Disclaimer**: Odonto AI is a clinical decision support system. All AI-generated treatment plans require review and approval by a licensed orthodontist before use in patient care.

- All patient data is tenant-isolated
- HIPAA-ready architecture (encryption at rest and in transit)
- Immutable audit logging
- Role-based access control (Owner, Orthodontist, Assistant, Viewer)

---

## 📝 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

Built with ❤️ for the orthodontic community by [Osama Kamel](https://github.com/osamakamel88)
