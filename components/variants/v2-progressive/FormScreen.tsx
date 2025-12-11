'use client';

import { useState, useEffect } from 'react';
import { FormData, filterSessions } from '@/lib/sessions';

interface Props {
  onSubmit: (data: FormData) => void;
}

interface IconOption {
  id: string;
  label: string;
  icon: string;
}

export default function FormScreen({ onSubmit }: Props) {
  const [who, setWho] = useState('');
  const [props, setProps] = useState('');
  const [theme, setTheme] = useState('');
  const [resultCount, setResultCount] = useState(0);

  const whoOptions: IconOption[] = [
    { id: 'teams', label: 'Teams', icon: '👥' },
    { id: 'individuals', label: 'Individuals', icon: '👤' },
    { id: 'groups', label: 'Groups', icon: '👨‍👩‍👧‍👦' },
  ];

  const propOptions: IconOption[] = [
    { id: 'physical', label: 'Physical Tools', icon: '🎯' },
    { id: 'natural', label: 'Natural Objects', icon: '🍃' },
    { id: 'none', label: 'No Props', icon: '🚫' },
  ];

  const themeOptions: IconOption[] = [
    { id: 'identity', label: 'Identity', icon: '🪞' },
    { id: 'leadership', label: 'Leadership', icon: '⭐' },
    { id: 'boundaries', label: 'Boundaries', icon: '🛡️' },
    { id: 'balance', label: 'Balance', icon: '⚖️' },
  ];

  // Update result count whenever selections change
  useEffect(() => {
    const formData: FormData = {};
    if (who) formData.who = who;
    if (props) formData.props = props;
    if (theme) formData.theme = theme;
    
    const sessions = filterSessions(formData);
    setResultCount(sessions.length);
  }, [who, props, theme]);

  const handleSubmit = () => {
    onSubmit({ who, props, theme });
  };

  const allFilled = who && props && theme;

  return (
    <div className="min-h-full flex flex-col p-6 fade-in">
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto shadow-lg">
          🐴
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Create Your Session
        </h2>
        <p className="text-center mb-8 text-gray-600">
          Select what fits your needs
        </p>

        <div className="space-y-8">
          {/* Who */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Who is this session for?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {whoOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setWho(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    who === option.id
                      ? 'border-teal-600 bg-teal-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="text-xs font-medium text-gray-700">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Props */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Include props?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {propOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setProps(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    props === option.id
                      ? 'border-teal-600 bg-teal-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="text-xs font-medium text-gray-700">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Choose a theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === option.id
                      ? 'border-teal-600 bg-teal-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="text-sm font-medium text-gray-700">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Result Count */}
        {(who || props || theme) && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-teal-600 text-lg">{resultCount}</span> sessions match
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className={`w-full font-bold py-4 px-6 rounded-xl transition-all mt-8 text-lg ${
            allFilled
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          View Sessions →
        </button>
      </div>
    </div>
  );
}

