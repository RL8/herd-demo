'use client';

import { useState } from 'react';
import { Session } from '@/lib/sessions';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  sessions: Session[];
}

export default function SessionSwiper({ sessions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? sessions.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === sessions.length - 1 ? 0 : prev + 1));
  };

  if (sessions.length === 0) return null;

  const session = sessions[currentIndex];

  return (
    <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
      {/* Session Content */}
      <div className="p-6 max-h-[500px] overflow-y-auto scroll-smooth">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-semibold">
              {session.specific_focus}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {currentIndex + 1} of {sessions.length}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {session.session_plan_name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {session.short_description}
          </p>
        </div>

        {/* Session Details */}
        <div className="space-y-4">
          {/* Objectives */}
          {session.session_objectives && (
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
              <h4 className="text-sm font-bold text-teal-900 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Objectives
              </h4>
              <div className="text-xs text-teal-800 space-y-1.5 leading-relaxed">
                {session.session_objectives.split('\n').filter(l => l.trim()).map((obj, i) => (
                  <p key={i} className="flex gap-2">
                    <span className="text-teal-500 flex-shrink-0">•</span>
                    <span>{obj}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          {session.materials_needed && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Materials Needed
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                {session.materials_needed}
              </p>
            </div>
          )}

          {/* Session Plan */}
          {session.detailed_session_plan && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Session Plan
              </h4>
              <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                {session.detailed_session_plan}
              </div>
            </div>
          )}

          {/* Facilitator Notes */}
          {session.facilitator_notes && (
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Facilitator Notes
              </h4>
              <p className="text-xs text-purple-800 leading-relaxed whitespace-pre-line">
                {session.facilitator_notes}
              </p>
            </div>
          )}

          {/* Equine Welfare */}
          {session.equine_welfare_considerations && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Equine Welfare Considerations
              </h4>
              <p className="text-xs text-green-800 leading-relaxed whitespace-pre-line">
                {session.equine_welfare_considerations}
              </p>
            </div>
          )}

          {/* Variations */}
          {(session.variation_1 || session.variation_2 || session.variation_3) && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Variations
              </h4>
              <div className="space-y-3">
                {session.variation_1 && (
                  <div>
                    <p className="text-xs font-semibold text-blue-800 mb-1">Variation 1:</p>
                    <p className="text-xs text-blue-700 leading-relaxed">{session.variation_1}</p>
                  </div>
                )}
                {session.variation_2 && (
                  <div>
                    <p className="text-xs font-semibold text-blue-800 mb-1">Variation 2:</p>
                    <p className="text-xs text-blue-700 leading-relaxed">{session.variation_2}</p>
                  </div>
                )}
                {session.variation_3 && (
                  <div>
                    <p className="text-xs font-semibold text-blue-800 mb-1">Variation 3:</p>
                    <p className="text-xs text-blue-700 leading-relaxed">{session.variation_3}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent p-4 border-t border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goToPrevious}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex gap-1.5">
            {sessions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex 
                    ? 'w-8 bg-teal-600' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to session ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

