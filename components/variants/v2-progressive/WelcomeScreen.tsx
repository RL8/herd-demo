'use client';

import { useState } from 'react';

interface Props {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: Props) {
  const [showIntro, setShowIntro] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (showIntro) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 fade-in overflow-y-auto">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-end mb-2">
              <button 
                onClick={() => setShowIntro(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
              HOW TO USE THE SESSION PLANS
            </h1>
            
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 mb-6">
              <p>
                At HERDMind®, we believe that each equine facilitated session is a unique unfolding 
                between the horses and humans present. We truly believe that "It's not about the activity" 
                - the creator of HERDMind, Dr. Veronica Lac, even wrote a book all about that! So, why 
                have we developed this session plan generator?
              </p>
              
              <p>
                We recognize that even the most seasoned practitioner might need some help to think 
                creatively in sessions. We also hear from new practitioners asking for help to get them 
                started with ideas for different client populations.
              </p>
              
              <p>
                All of the session plans that our generator creates are designed using The HERD Institute 
                Model™ as a foundation, so you can adapt, flex, and modify each session however you want 
                to meet the needs of your specific client population.
              </p>
              
              <p className="font-medium text-teal-700">
                These sessions are NOT designed for you to follow step-by-step as tasks to complete. 
                Instead, they offer a broad framework of ideas for you to take and make them your own.
              </p>
              
              <p>
                Each session begins by assuming that you have already covered the basics of safety and 
                confidentiality in your session.
              </p>
              
              <p className="italic">
                Have some ideas of your own? Feel free to share a session plan with us in our discussion forum!
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none text-gray-600">
                <input 
                  type="checkbox" 
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded border-gray-300" 
                />
                Don't show this message again
              </label>
              
              <button
                onClick={() => {
                  if (dontShowAgain) {
                    localStorage.setItem('v2-intro-skipped', 'true');
                  }
                  setShowIntro(false);
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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

