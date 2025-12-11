'use client';

import { useState } from 'react';
import { FormData } from '@/lib/sessions';

interface Props {
  onSubmit: (data: FormData) => void;
}

export default function FormScreen({ onSubmit }: Props) {
  const [scope, setScope] = useState('');
  const [who, setWho] = useState('');
  const [props, setProps] = useState('');
  const [theme, setTheme] = useState('');

  const allFilled = scope && who && props && theme;

  const handleSubmit = () => {
    if (allFilled) {
      onSubmit({ scope, who, props, theme });
    }
  };

  return (
    <div className="min-h-full flex flex-col p-6 max-w-2xl mx-auto fade-in">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto shadow-lg">
          HM
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Let's Create Your Session Plan
        </h2>
        <p className="text-center mb-8 text-sm text-gray-600">
          Tell us a few details about your session and HERDMind will build a session plan for you, 
          complete with facilitator tips.
        </p>

        <div className="glass-card p-6 rounded-xl space-y-5">
          {/* Scope of Practice */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              What is your scope of practice?
            </label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 text-sm"
            >
              <option value="">Select session type...</option>
              <option value="psychotherapy">Psychotherapy/Counseling Incorporating Equines</option>
              <option value="coaching">Coaching/Education Incorporating Equines</option>
            </select>
          </div>

          {/* Who */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Who is the session for?
            </label>
            <select
              value={who}
              onChange={(e) => setWho(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 text-sm"
            >
              <option value="">Select client category...</option>
              <option value="teams">Organizational Teams/Leaders</option>
              <option value="individuals">Individuals</option>
              <option value="groups">Groups</option>
            </select>
          </div>

          {/* Props */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Want to include props?
            </label>
            <select
              value={props}
              onChange={(e) => setProps(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 text-sm"
            >
              <option value="">Select prop type...</option>
              <option value="physical">Physical Tools (Pool noodles, cones, ground poles...)</option>
              <option value="natural">Natural Objects</option>
              <option value="none">No Props</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              General Session Theme?
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 text-sm"
            >
              <option value="">Select a theme...</option>
              <option value="identity">Exploring Identity & Belonging</option>
              <option value="leadership">Leadership & Communication</option>
              <option value="boundaries">Boundaries & Safety</option>
              <option value="balance">Rediscovering Balance</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-colors mt-6 ${
            allFilled
              ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer'
              : 'bg-gray-300 text-white cursor-not-allowed'
          }`}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

