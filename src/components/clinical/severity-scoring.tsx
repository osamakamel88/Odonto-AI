"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function SeverityScoring() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Severity Index (PAR / IOTN)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>PAR Score</span>
            <span className="font-bold text-red-600">32</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>IOTN DHC</span>
            <span className="font-bold text-yellow-600">4d</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}