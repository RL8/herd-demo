'use client';

import { useState } from 'react';
import { useVariant } from '@/lib/variants';
import { FileText, Sparkles, MessageCircle, ArrowRight, Info, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function HomeScreen() {
  const { setVariant } = useVariant();
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);

  const concepts = [
    {
      id: 'current' as const,
      name: 'v1: Current',
      description: 'The existing design, ported to React. Traditional form-based approach with dropdowns and full session details.',
      icon: FileText,
      color: 'bg-teal-600',
      differences: [
        'Traditional dropdown form with all questions at once',
        'Full session details displayed immediately',
        'Familiar UX pattern users already know',
        'Best for users who want to see everything upfront'
      ],
    },
    {
      id: 'progressive' as const,
      name: 'v2: Progressive',
      description: 'Modern wizard-style flow with one question per screen. Icon-based selection and progressive disclosure.',
      icon: Sparkles,
      color: 'bg-teal-500',
      differences: [
        'One question per screen - less overwhelming',
        'Icon-based visual selection cards',
        'Live result count as you make choices',
        'Progressive disclosure - see details when ready',
        'Best for users who prefer step-by-step guidance'
      ],
    },
    {
      id: 'conversational' as const,
      name: 'v3: Conversational',
      description: 'Chat-based interface with free-form input. The app asks follow-up questions to guide you to the perfect session.',
      icon: MessageCircle,
      color: 'bg-teal-700',
      differences: [
        'Chat-like interface - feels natural and friendly',
        'Free-form text input (coming soon)',
        'Smart follow-up questions based on your responses',
        'Results from actual session plans database',
        'Best for users who prefer conversational interaction'
      ],
    },
  ];

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4 pt-2">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3 mx-auto shadow-lg">
              🐴
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              HERDMind® Session Planner
            </h1>
            <p className="text-gray-600 text-xs px-4">
              Choose a design concept to explore. You can return here anytime to try a different approach.
            </p>
          </div>

          {/* Concept Cards */}
          <div className="space-y-3">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              const isTooltipOpen = tooltipOpen === concept.id;
              return (
                <Card
                  key={concept.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-teal-300 relative"
                  onClick={() => setVariant(concept.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${concept.color} p-2.5 rounded-xl text-white flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-sm">{concept.name}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTooltipOpen(isTooltipOpen ? null : concept.id);
                          }}
                          className="text-teal-600 hover:text-teal-700 p-1 -mt-1 -mr-1 flex-shrink-0"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                        {concept.description}
                      </p>
                      {isTooltipOpen && (
                        <div className="mb-2 p-2.5 bg-teal-50 rounded-lg border border-teal-200">
                          <div className="flex items-start justify-between mb-1.5">
                            <h4 className="text-xs font-semibold text-teal-900">Key Differences:</h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setTooltipOpen(null);
                              }}
                              className="text-teal-700 hover:text-teal-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <ul className="text-xs text-teal-800 space-y-1">
                            {concept.differences.map((diff, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-teal-600 mt-0.5">•</span>
                                <span>{diff}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button className="text-teal-600 text-xs font-medium flex items-center gap-1 hover:text-teal-700 mt-1">
                        Start exploring
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-6 bg-teal-50 rounded-xl p-4 border border-teal-100">
            <p className="text-xs text-teal-800 text-center leading-relaxed">
              <span className="font-semibold">💡 Tip:</span> Once you select a concept, explore it fully. 
              Use the bottom navigation to return here and try a different approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
