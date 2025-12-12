'use client';

import { Loader2 } from 'lucide-react';

export default function DemoLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto shadow-xl">
          🐴
        </div>
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
        <p className="text-gray-700 font-medium">Loading demo...</p>
      </div>
    </div>
  );
}

