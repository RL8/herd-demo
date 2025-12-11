'use client';

import { Card } from '@/components/ui/card';
import { MessageSquare, Users, User, Sparkles } from 'lucide-react';

export interface MockConversation {
  id: string;
  title: string;
  preview: string[];
  result: string;
  icon: typeof MessageSquare;
  messages: string[]; // Full conversation flow
}

interface Props {
  onSelect: (conversation: MockConversation) => void;
}

export default function ConversationSuggestions({ onSelect }: Props) {
  const conversations: MockConversation[] = [
    {
      id: 'team-leadership',
      title: 'Team Building',
      preview: [
        "I need a session for my team",
        "We're working on leadership and communication",
      ],
      messages: [
        "I need a session for my team",
        "We're working on leadership and communication",
      ],
      result: 'Finds 8 sessions for teams exploring leadership',
      icon: Users,
    },
    {
      id: 'individual-boundaries',
      title: 'Individual Therapy',
      preview: [
        "Working with someone on boundaries",
        "It's for an individual client",
      ],
      messages: [
        "Working with someone on boundaries",
        "It's for an individual client",
      ],
      result: 'Finds 12 sessions for individuals exploring boundaries',
      icon: User,
    },
    {
      id: 'group-identity',
      title: 'Group Session',
      preview: [
        "I want to use natural objects with a group",
        "The focus is identity and belonging",
      ],
      messages: [
        "I want to use natural objects with a group",
        "The focus is identity and belonging",
      ],
      result: 'Finds 6 sessions for groups using natural props',
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-3 px-4 pb-4">
      <p className="text-sm font-medium text-gray-700 mb-3">Try these examples:</p>
      {conversations.map((conv) => {
        const Icon = conv.icon;
        return (
          <Card
            key={conv.id}
            onClick={() => onSelect(conv)}
            className="p-4 cursor-pointer hover:shadow-md transition-all border-2 hover:border-teal-300"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-100 rounded-lg text-teal-700 flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{conv.title}</h4>
                <div className="space-y-1 mb-2">
                  {conv.preview.map((msg, i) => (
                    <p key={i} className="text-xs text-gray-600 italic">"{msg}"</p>
                  ))}
                </div>
                <p className="text-xs text-teal-600 font-medium">{conv.result}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

