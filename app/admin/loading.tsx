'use client';

import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <p className="text-gray-700 font-medium">Loading dashboard...</p>
      </div>
    </div>
  );
}

