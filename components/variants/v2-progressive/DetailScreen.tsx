'use client';

import { useState } from 'react';
import { Session } from '@/lib/sessions';
import Accordion from './Accordion';

interface Props {
  session: Session;
  onBack: () => void;
}

export default function DetailScreen({ session, onBack }: Props) {
  const [activeVariation, setActiveVariation] = useState(0);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const variations = [
    session.variation_1,
    session.variation_2,
    session.variation_3,
  ].filter(Boolean);

  const handleRating = (value: number) => {
    setRating(value);
    setHasRated(true);
    setTimeout(() => {
      alert('Thank you for your feedback!');
    }, 500);
  };

  return (
    <div className="fade-in pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg z-10 px-4 py-3 border-b border-gray-200">
        <button
          onClick={onBack}
          className="text-teal-600 font-medium text-sm flex items-center gap-1 hover:text-teal-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold mb-2">{session.session_plan_name}</h1>
          <p className="text-teal-100 text-sm mb-3">{session.specific_focus}</p>
          {session.materials_needed && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4">
              <p className="text-xs font-semibold mb-1">Materials:</p>
              <p className="text-sm">{session.materials_needed}</p>
            </div>
          )}
        </div>

        {/* Quick Summary */}
        {session.short_description && (
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {session.short_description}
            </p>
          </div>
        )}

        {/* Objectives */}
        {session.session_objectives && (
          <Accordion title="Session Objectives" defaultOpen>
            <div className="space-y-2 text-sm text-gray-700">
              {session.session_objectives.split('\n').filter(line => line.trim()).map((obj, i) => (
                <p key={i} className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{obj}</span>
                </p>
              ))}
            </div>
          </Accordion>
        )}

        {/* Session Details */}
        {session.detailed_session_plan && (
          <Accordion title="How It Works">
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              {session.detailed_session_plan.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Accordion>
        )}

        {/* Facilitator Notes */}
        {session.facilitator_notes && (
          <Accordion title="Facilitator Tips">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
              <p className="text-sm text-gray-700">{session.facilitator_notes}</p>
            </div>
          </Accordion>
        )}

        {/* Equine Welfare */}
        {session.equine_welfare_considerations && (
          <Accordion title="Equine Welfare">
            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded space-y-1">
              {session.equine_welfare_considerations.split('\n').filter(line => line.trim()).map((item, i) => (
                <p key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </Accordion>
        )}

        {/* Variations Carousel */}
        {variations.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Try These Variations</h3>
            
            {/* Carousel Dots */}
            <div className="flex gap-2 justify-center mb-3">
              {variations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVariation(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeVariation ? 'w-8 bg-teal-600' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Variation ${idx + 1}`}
                />
              ))}
            </div>

            {/* Variation Content */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-700 uppercase">
                  Variation {activeVariation + 1}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveVariation(Math.max(0, activeVariation - 1))}
                    disabled={activeVariation === 0}
                    className="text-blue-600 disabled:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveVariation(Math.min(variations.length - 1, activeVariation + 1))}
                    disabled={activeVariation === variations.length - 1}
                    className="text-blue-600 disabled:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{variations[activeVariation]}</p>
            </div>
          </div>
        )}

        {/* Inline Feedback */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 mb-3">Was this helpful?</p>
            <div className="flex gap-3 justify-center mb-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRating(value)}
                  disabled={hasRated}
                  className={`transition-all ${hasRated ? 'cursor-default' : 'hover:scale-110'}`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      value <= rating ? 'text-teal-600 fill-current' : 'text-gray-300'
                    }`}
                    fill={value <= rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
            </div>
            {hasRated && (
              <p className="text-xs text-teal-600 font-medium">Thanks for your feedback!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

