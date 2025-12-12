'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, X } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const introContent = [
  {
    title: "Welcome to Session Plans",
    content: "At HERDMind®, we believe that each equine facilitated session is a unique unfolding between the horses and humans present.",
    highlight: "It's not about the activity",
    icon: "🐴"
  },
  {
    title: "Why Use This Generator?",
    content: "We recognize that even the most seasoned practitioner might need some help to think creatively in sessions. New practitioners often ask for help to get started with ideas for different client populations.",
    highlight: null,
    icon: "💡"
  },
  {
    title: "Built on HERD Institute Model™",
    content: "All session plans are designed using The HERD Institute Model™ as a foundation, so you can adapt, flex, and modify each session to meet the needs of your specific client population.",
    highlight: null,
    icon: "🏛️"
  },
  {
    title: "How to Use These Plans",
    content: "These sessions are NOT designed for you to follow step-by-step as tasks to complete. Instead, they offer a broad framework of ideas for you to take and make them your own.",
    highlight: "Framework, not a script",
    icon: "📋"
  },
  {
    title: "Ready to Begin?",
    content: "Each session assumes you have already covered the basics of safety and confidentiality. Have ideas of your own? Share them in our discussion forum!",
    highlight: null,
    icon: "🚀"
  }
];

export default function IntroWizard({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleNext = () => {
    if (currentStep < introContent.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (dontShowAgain) {
        localStorage.setItem('v2-intro-skipped', 'true');
      }
      onComplete();
    }
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('v2-intro-skipped', 'true');
    }
    onComplete();
  };

  const progress = ((currentStep + 1) / introContent.length) * 100;
  const current = introContent[currentStep];

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-md w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {introContent.length}
            </span>
            <button 
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Skip
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            {/* Icon */}
            <div className="text-6xl mb-6 text-center">
              {current.icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {current.title}
            </h2>

            {/* Content */}
            <p className="text-gray-600 leading-relaxed mb-4 text-center">
              {current.content}
            </p>

            {/* Highlight */}
            {current.highlight && (
              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-6">
                <p className="text-teal-700 font-semibold text-center">
                  "{current.highlight}"
                </p>
              </div>
            )}

            {/* Don't show again checkbox (only on last step) */}
            {currentStep === introContent.length - 1 && (
              <label className="flex items-center justify-center gap-2 text-sm cursor-pointer select-none text-gray-600 mb-6">
                <input 
                  type="checkbox" 
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded border-gray-300" 
                />
                Don't show this again
              </label>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all flex items-center justify-center gap-2"
              >
                {currentStep === introContent.length - 1 ? (
                  <>
                    <Check className="w-5 h-5" />
                    Get Started
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {introContent.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-teal-600'
                      : index < currentStep
                      ? 'w-2 bg-teal-400'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

