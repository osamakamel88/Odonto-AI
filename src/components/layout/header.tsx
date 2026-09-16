import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8">
      <div className="flex items-center text-sm text-slate-500">
        <span>Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="pl-9 pr-4 py-2 bg-slate-50 border-slate-200 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> New Patient
        </Button>
        <button className="text-slate-400 hover:text-slate-600">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}