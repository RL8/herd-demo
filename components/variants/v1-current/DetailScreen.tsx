'use client';

import { Session } from '@/lib/sessions';

interface Props {
  session: Session;
  onBack: () => void;
  onFeedback: () => void;
}

export default function DetailScreen({ session, onBack, onFeedback }: Props) {
  return (
    <div className="fade-in pb-20">
      {/* Nav Bar */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-lg z-10 px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <button
          onClick={onBack}
          className="bg-teal-600 text-white text-xs py-1 px-3 rounded-md hover:bg-teal-700"
        >
          ← BACK
        </button>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-teal-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{session.session_plan_name}</h1>
          <p className="text-sm mt-1 text-gray-600">Session Focus:</p>
          <p className="font-medium text-gray-900">{session.specific_focus}</p>
        </div>

        {/* Materials */}
        {session.materials_needed && (
          <div className="glass-card rounded-xl p-5 bg-teal-50/50 border border-teal-200">
            <div className="flex flex-col items-center text-center">
              <svg className="w-5 h-5 text-teal-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="font-bold text-sm mb-2 text-gray-900">Materials Needed:</h3>
              <p className="font-medium text-sm text-gray-900">{session.materials_needed}</p>
              <hr className="w-full border-teal-200 my-3" />
              <p className="text-sm leading-relaxed text-gray-700">
                {session.short_description}
              </p>
            </div>
          </div>
        )}

        {/* Objectives */}
        {session.session_objectives && (
          <div className="glass-card rounded-xl p-5 bg-teal-50/50 border border-teal-200">
            <div className="flex flex-col items-center text-center">
              <svg className="w-5 h-5 text-teal-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="font-bold text-sm mb-2 text-gray-900">Session Objectives</h3>
              <div className="text-left text-sm space-y-2 text-gray-700 w-full">
                {session.session_objectives.split('\n').filter(line => line.trim()).map((obj, i) => (
                  <p key={i}>{obj}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Session Details */}
        {session.detailed_session_plan && (
          <div className="glass-card rounded-xl p-5 bg-teal-50/50 border border-teal-200">
            <div className="flex flex-col items-center text-center mb-4">
              <svg className="w-5 h-5 text-teal-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-bold text-sm text-gray-900">Session Details</h3>
            </div>
            <div className="text-sm space-y-4 leading-relaxed text-justify text-gray-700">
              {session.detailed_session_plan.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* Equine Welfare */}
        {session.equine_welfare_considerations && (
          <div className="glass-card rounded-xl p-5 bg-teal-50/50 border border-teal-200">
            <div className="flex flex-col items-center text-center mb-2">
              <svg className="w-5 h-5 text-teal-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h3 className="font-bold text-sm text-gray-900">Equine Welfare Considerations</h3>
            </div>
            <div className="text-sm text-center space-y-1 text-gray-700">
              {session.equine_welfare_considerations.split('\n').filter(line => line.trim()).map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        )}

        {/* Facilitator Notes */}
        {session.facilitator_notes && (
          <div className="glass-card rounded-xl p-5 bg-teal-50/50 border border-teal-200">
            <div className="flex flex-col items-center text-center mb-2">
              <svg className="w-5 h-5 text-teal-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="font-bold text-sm text-gray-900">Facilitator Notes</h3>
            </div>
            <p className="text-sm text-center text-gray-700">{session.facilitator_notes}</p>
          </div>
        )}

        {/* Variations */}
        {(session.variation_1 || session.variation_2 || session.variation_3) && (
          <div className="glass-card rounded-xl p-5 bg-teal-50/50 border border-teal-200">
            <div className="flex flex-col items-center text-center mb-4">
              <svg className="w-5 h-5 text-teal-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <h3 className="font-bold text-sm text-gray-900">Variations</h3>
            </div>
            <div className="space-y-4 text-sm text-gray-700">
              {session.variation_1 && (
                <div>
                  <span className="font-bold text-teal-700">Variation 1:</span>
                  <p className="mt-1">{session.variation_1}</p>
                </div>
              )}
              {session.variation_2 && (
                <div className="border-t border-teal-200 pt-3">
                  <span className="font-bold text-teal-700">Variation 2:</span>
                  <p className="mt-1">{session.variation_2}</p>
                </div>
              )}
              {session.variation_3 && (
                <div className="border-t border-teal-200 pt-3">
                  <span className="font-bold text-teal-700">Variation 3:</span>
                  <p className="mt-1">{session.variation_3}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rating Section */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <div className="flex text-teal-600 gap-2 text-xl mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>
          <button
            onClick={onFeedback}
            className="text-sm hover:text-teal-600 text-gray-600"
          >
            Rate Session?
          </button>
        </div>
      </div>
    </div>
  );
}

