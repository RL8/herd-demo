'use client';

import { useState } from 'react';
import { FormData, filterSessions, Session } from '@/lib/sessions';

interface Props {
  formData: FormData;
  onBack: () => void;
  onSessionSelect: (session: Session) => void;
}

export default function ResultsScreen({ formData, onBack, onSessionSelect }: Props) {
  const [sortBy, setSortBy] = useState<'relevance' | 'name'>('relevance');
  const sessions = filterSessions(formData);

  const sortedSessions = [...sessions].sort((a, b) => {
    if (sortBy === 'name') {
      return a.session_plan_name.localeCompare(b.session_plan_name);
    }
    return 0; // relevance is default order
  });

  const getMatchStrength = (session: Session): 'strong' | 'good' | 'partial' => {
    let matches = 0;
    if (formData.who && session.client_category.toLowerCase().includes(formData.who.toLowerCase())) matches++;
    if (formData.theme && session.session_theme.toLowerCase().includes(formData.theme.toLowerCase())) matches++;
    if (formData.props === 'none' || (formData.props && session.prop_type.toLowerCase().includes(formData.props.toLowerCase()))) matches++;
    
    if (matches === 3) return 'strong';
    if (matches === 2) return 'good';
    return 'partial';
  };

  return (
    <div className="min-h-full flex flex-col fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg z-10 border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="text-teal-600 font-medium text-sm flex items-center gap-1 hover:text-teal-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Edit
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'relevance' | 'name')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="relevance">Best Match</option>
            <option value="name">A-Z</option>
          </select>
        </div>

        {/* Active Filters */}
        <div className="flex gap-2 flex-wrap">
          {formData.who && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
              {formData.who}
              <button onClick={() => {}} className="hover:text-teal-900">×</button>
            </span>
          )}
          {formData.props && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
              {formData.props}
              <button onClick={() => {}} className="hover:text-teal-900">×</button>
            </span>
          )}
          {formData.theme && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
              {formData.theme}
              <button onClick={() => {}} className="hover:text-teal-900">×</button>
            </span>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-bold text-gray-900">
          {sessions.length} Session{sessions.length !== 1 ? 's' : ''} Found
        </h3>
      </div>

      {/* Results List */}
      {sessions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-900 font-medium mb-2">No sessions found</p>
          <p className="text-gray-600 text-sm mb-4">Try adjusting your filters</p>
          <button
            onClick={onBack}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Change Filters
          </button>
        </div>
      ) : (
        <div className="px-4 pb-8 space-y-3">
          {sortedSessions.slice(0, 15).map((session) => {
            const match = getMatchStrength(session);
            return (
              <div
                key={session.id}
                onClick={() => onSessionSelect(session)}
                className="bg-white rounded-xl p-4 border border-gray-200 cursor-pointer hover:shadow-md hover:border-teal-300 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-teal-700">
                        {session.session_plan_name}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        match === 'strong' ? 'bg-green-100 text-green-700' :
                        match === 'good' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {match === 'strong' ? '✓ Strong Match' :
                         match === 'good' ? 'Good Match' :
                         'Partial Match'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {session.short_description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
          {sessions.length > 15 && (
            <p className="text-center text-sm text-gray-600 py-4">
              Showing 15 of {sessions.length} results
            </p>
          )}
        </div>
      )}
    </div>
  );
}

