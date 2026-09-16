"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToothChart } from './tooth-chart';

export function ClinicalFindingsForm() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Demographics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Chief Complaint</label>
            <input className="w-full border p-2 rounded mt-1" placeholder="Enter complaint" />
          </div>
          <div>
            <label className="text-sm font-medium">Angle Classification</label>
            <select className="w-full border p-2 rounded mt-1 bg-white">
              <option>Class I</option>
              <option>Class II div 1</option>
              <option>Class II div 2</option>
              <option>Class III</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <ToothChart />

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Findings</Button>
      </div>
    </div>
  );
}