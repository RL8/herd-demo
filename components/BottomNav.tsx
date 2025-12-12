'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVariant } from '@/lib/variants';
import { Home, LogOut } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import TransitionScreen from './TransitionScreen';

export default function BottomNav() {
  const router = useRouter();
  const { variant, setVariant } = useVariant();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const variantLabels = {
    home: 'Demo Home',
    current: 'Current Design',
    progressive: 'Progressive Wizard',
    conversational: 'Chat Interface'
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleExitClick = () => {
    if (variant === 'home') {
      // Already at demo home, just go to app home
      router.push('/');
    } else {
      // Show confirmation
      setShowConfirm(true);
    }
  };

  const handleConfirmExit = () => {
    setShowConfirm(false);
    setShowTransition(true);
    
    // Show transition for 1.5 seconds then navigate
    setTimeout(() => {
      setVariant('home');
      setShowTransition(false);
    }, 1500);
  };

  return (
    <>
      <div className="flex justify-around py-3">
        {/* Home Button */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center w-1/2 transition-colors text-gray-500 hover:text-gray-700"
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">App Home</span>
        </button>

        {/* Exit Current Variant */}
        <button
          onClick={handleExitClick}
          className={`flex flex-col items-center w-1/2 transition-colors ${
            variant === 'home' ? 'text-gray-400' : 'text-teal-600'
          }`}
        >
          <LogOut className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium text-center px-1 leading-tight">
            {variant === 'home' ? 'Demo Home' : `Exit ${variantLabels[variant]}`}
          </span>
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirm}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowConfirm(false)}
        title="Leave this experience?"
        message="Your current progress will be lost. You'll need to start over when you return."
      />

      {/* Transition Screen */}
      {showTransition && <TransitionScreen message="Returning to demo home..." />}
    </>
  );
}

