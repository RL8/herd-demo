'use client';

import { useState } from 'react';
import IntroWizard from './IntroWizard';

interface Props {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: Props) {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('v2-intro-skipped') !== 'true';
    }
    return true;
  });

  if (showIntro) {
    return <IntroWizard onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 fade-in">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto shadow-xl">
          🐴
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Let's find your perfect session
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We'll ask you a few quick questions to match you with the ideal equine session plan for your needs.
        </p>

        <button
          onClick={onNext}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

