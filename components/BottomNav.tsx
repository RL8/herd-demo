'use client';

import { useVariant } from '@/lib/variants';
import { Home, FileText, Sparkles, MessageCircle } from 'lucide-react';

export default function BottomNav() {
  const { variant, setVariant } = useVariant();

  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'current' as const, label: 'Current', icon: FileText },
    { id: 'progressive' as const, label: 'Progressive', icon: Sparkles },
    { id: 'conversational' as const, label: 'Chat', icon: MessageCircle },
  ];

  return (
    <div className="flex justify-around py-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = variant === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setVariant(tab.id)}
            className={`flex flex-col items-center w-1/4 transition-colors relative ${
              isActive ? 'text-teal-600' : 'text-gray-500'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-2' : ''}`} />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {isActive && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-teal-600 rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

