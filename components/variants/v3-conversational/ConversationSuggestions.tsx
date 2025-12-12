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
      title: 'Team Leadership Session',
      preview: [
        "I'm planning a session for my leadership team of 8 people",
        "We want to work on communication and trust",
        "Preferably with some physical props to create challenges",
      ],
      messages: [
        "I'm planning a session for my leadership team of 8 people",
        "We want to work on communication and trust",
        "I'd like to use physical props - cones, poles, that kind of thing",
      ],
      result: 'AI finds relevant team sessions with props',
      icon: Users,
    },
    {
      id: 'individual-boundaries',
      title: 'Individual Client Work',
      preview: [
        "I have a client struggling with personal boundaries",
        "Just one-on-one work",
        "I prefer keeping it simple - no props",
      ],
      messages: [
        "I have a client struggling with personal boundaries",
        "It's individual work, one-on-one",
        "No props - I want to keep it organic with just the horses",
      ],
      result: 'AI recommends boundary-focused individual sessions',
      icon: User,
    },
    {
      id: 'group-identity',
      title: 'Group Identity Exploration',
      preview: [
        "Working with a group on identity and belonging",
        "I love using natural objects like rocks and branches",
        "About 6-8 participants",
      ],
      messages: [
        "I'm working with a group on identity and belonging themes",
        "Natural objects - rocks, branches, things found in nature",
        "It's a group of about 6-8 people",
      ],
      result: 'AI surfaces group sessions using natural elements',
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

