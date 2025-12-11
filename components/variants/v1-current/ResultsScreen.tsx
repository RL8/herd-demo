'use client';

import { FormData, filterSessions, Session } from '@/lib/sessions';

interface Props {
  formData: FormData;
  onBack: () => void;
  onSessionSelect: (session: Session) => void;
}

export default function ResultsScreen({ formData, onBack, onSessionSelect }: Props) {
  const sessions = filterSessions(formData);

  return (
    <div className="min-h-full flex flex-col p-6 fade-in">
      <div className="text-center mb-8 pt-4">
        <h2 className="text-teal-700 font-bold tracking-widest text-sm mb-1 uppercase">
          Shared Wisdom. Collective Purpose.
        </h2>
      </div>

      <div className="flex gap-2 justify-center mb-8 flex-wrap">
        <button
          onClick={onBack}
          className="bg-teal-600 text-white text-xs py-1 px-3 rounded-full hover:bg-teal-700"
        >
          ← BACK
        </button>
        <button
          onClick={onBack}
          className="bg-teal-600 text-white text-xs py-1 px-3 rounded-full hover:bg-teal-700"
        >
          🔄 CREATE NEW PLAN
        </button>
      </div>

      <h3 className="text-center font-bold mb-6 text-gray-900">
        CHECK OUT YOUR SESSION PLANS!
      </h3>

      {sessions.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">No sessions found matching your criteria.</p>
          <button
            onClick={onBack}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Try Different Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4 pb-8">
          {sessions.slice(0, 10).map((session) => (
            <div
              key={session.id}
              onClick={() => onSessionSelect(session)}
              className="bg-gray-100 rounded-xl p-6 cursor-pointer hover:bg-gray-200 transition-colors border-l-4 border-teal-500 shadow-sm flex justify-between items-center group"
            >
              <div>
                <h4 className="text-lg font-bold text-gray-900">{session.session_plan_name}</h4>
                <p className="text-sm mt-1 text-gray-600">
                  Specific Focus: <span className="font-medium text-gray-900">{session.specific_focus}</span>
                </p>
              </div>
              <div className="text-teal-600 group-hover:translate-x-1 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
          {sessions.length > 10 && (
            <p className="text-center text-sm text-gray-600 py-4">
              Showing 10 of {sessions.length} results
            </p>
          )}
        </div>
      )}
    </div>
  );
}

