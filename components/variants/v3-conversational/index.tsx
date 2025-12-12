'use client';

import { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import IntroChat from './IntroChat';
import ConversationSuggestions, { MockConversation } from './ConversationSuggestions';
import SessionSwiper from './SessionSwiper';
import { FormData, filterSessions, Session } from '@/lib/sessions';
import { parseUserInput, generateFollowUpQuestion, extractFormData, ConversationState } from '@/lib/conversationLogic';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
};

type Step = 'greeting' | 'collecting' | 'results';

export default function V3Conversational() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('greeting');
  const [conversationState, setConversationState] = useState<ConversationState>({
    collected: {},
    needsClarification: true,
    confidence: 0,
  });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('v3-intro-skipped') !== 'true';
    }
    return true;
  });
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // LLM-style bot responses that adapt to user context
  const getMockedBotResponse = (userText: string, state: ConversationState): string => {
    const lowerText = userText.toLowerCase();
    
    // Check what we're collecting
    if (!state.collected.who) {
      if (lowerText.includes('team') || lowerText.includes('organization') || lowerText.includes('leaders')) {
        return "I understand you're looking for a team session. Teams often benefit from collaborative exercises that surface group dynamics and leadership patterns. To narrow down the best options from our session library, tell me - are you thinking of incorporating props, or would you prefer a more organic approach with just the horses and participants?";
      }
      if (lowerText.includes('individual') || lowerText.includes('one person') || lowerText.includes('client')) {
        return "An individual session - that's great for deeper personal work. I'm thinking about sessions in our database that allow for introspection and one-on-one connection with the horses. To help me find the perfect match, would you like to use any props or tools, or keep it minimal with just the human-horse interaction?";
      }
      if (lowerText.includes('group') || lowerText.includes('multiple')) {
        return "A group session offers wonderful opportunities for observing how individuals relate to each other and the herd. I'm already filtering through sessions designed for group dynamics. Before I show you options, let me ask - are you interested in using props like natural objects or physical tools to add structure, or would you prefer a prop-free approach?";
      }
      return "I'd love to help you find the ideal session from our HERDMind database. To give you the most relevant recommendations, could you tell me who this session is for? For example, is it a team working on organizational goals, an individual client, or a group exploring shared themes?";
    }
    
    if (!state.collected.props) {
      if (lowerText.includes('physical') || lowerText.includes('tools') || lowerText.includes('cones') || lowerText.includes('poles')) {
        return "Physical tools like cones, poles, and structured equipment can create clear boundaries and challenges that often mirror real-world situations. I'm narrowing down sessions that effectively use these props. Now, what's the core theme or focus you want to address? For example, are you working on leadership, boundaries, identity, or something else?";
      }
      if (lowerText.includes('natural') || lowerText.includes('objects') || lowerText.includes('organic')) {
        return "Natural objects offer such beautiful organic metaphors - rocks, branches, and found items often resonate deeply with participants. I'm filtering for sessions that incorporate these elements thoughtfully. To complete my search, what theme are you hoping to explore? Leadership development, personal boundaries, identity and belonging, or balance?";
      }
      if (lowerText.includes('no props') || lowerText.includes('without') || lowerText.includes('nothing')) {
        return "Sometimes the most powerful sessions are the simplest - just the authentic presence of horses and humans together. I'm looking at prop-free sessions that let the natural herd dynamics take center stage. What theme would you like to focus on? I can filter by leadership, boundaries, identity, balance, or other focus areas.";
      }
      return "Got it. Now I'm curious about props - would you like to incorporate any tools or objects? Some facilitators love using physical props like cones and poles, others prefer natural objects found in the environment, and many keep it completely prop-free to let the horses be the only 'tool'. What resonates with your approach?";
    }
    
    if (!state.collected.theme) {
      if (lowerText.includes('identity') || lowerText.includes('belonging')) {
        return "Identity and belonging - these are profound themes, especially powerful in equine work where the herd naturally mirrors questions of 'who am I' and 'where do I fit'. Let me search through our session plans that specifically address these themes... I'm analyzing which ones match your criteria.";
      }
      if (lowerText.includes('leadership') || lowerText.includes('communication')) {
        return "Leadership and communication are cornerstone themes in our database. The horses provide immediate feedback on leadership presence, authenticity, and how we communicate non-verbally. I'm pulling up sessions specifically designed to surface these dynamics... This should give you some excellent options.";
      }
      if (lowerText.includes('boundaries') || lowerText.includes('safety')) {
        return "Boundaries and personal safety - such essential work. Horses are masters at setting and respecting boundaries, making them ideal teachers for this theme. I'm searching for sessions that explicitly work with boundary-setting, consent, and creating safe space... Let me see what matches your criteria.";
      }
      if (lowerText.includes('balance') || lowerText.includes('equilibrium')) {
        return "Balance - both physical and metaphorical - is a rich theme. Whether it's work-life balance, emotional regulation, or finding equilibrium in relationships, horses naturally invite us to explore these concepts. Searching our plans for balance-focused sessions now...";
      }
      return "Perfect, I have a clear picture of who you're working with and your approach to props. The last piece is the theme or focus - what do you want participants to explore or learn? Common themes in our database include leadership, boundaries, identity and belonging, balance, or you can name something specific to your work.";
    }
    
    return "Excellent! I have everything I need. Let me search through our HERDMind session plans database...";
  };

  useEffect(() => {
    // Initial greeting after intro is dismissed
    if (!showIntro) {
      addBotMessage("Welcome! I'm your AI assistant for finding the perfect HERDMind session plan. I can understand natural conversation and search through our complete database of session plans. Select a scenario below to see how I work:");
    }
  }, [showIntro]);

  useEffect(() => {
    // Auto-scroll to bottom
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showTyping]);

  const addBotMessage = (text: string) => {
    setShowTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text,
        timestamp: new Date()
      }]);
      setShowTyping(false);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    }]);
  };

  const handleUserMessage = (text: string) => {
    addUserMessage(text);
    setShowSuggestions(false);

    // Parse the input to update state
    const newState = parseUserInput(text, conversationState);
    setConversationState(newState);

    // Check if we have enough info
    setTimeout(() => {
      if (!newState.needsClarification) {
        // We have all the info, show results from actual database
        const formData = extractFormData(newState);
        const results = filterSessions(formData);
        setSessions(results);
        addBotMessage(`Perfect! I found ${results.length} session${results.length !== 1 ? 's' : ''} that match your criteria. Here are your recommendations from our session plans database:`);
        setCurrentStep('results');
      } else {
        // Need more info, use mocked response
        const mockedResponse = getMockedBotResponse(text, newState);
        addBotMessage(mockedResponse);
        setCurrentStep('collecting');
      }
    }, 800);
  };

  const handleQuickReply = (value: string, label: string, type: 'who' | 'props' | 'theme') => {
    addUserMessage(label);
    setShowSuggestions(false);

    const newState = {
      ...conversationState,
      collected: {
        ...conversationState.collected,
        [type]: value,
      },
    };

    // Calculate confidence
    const collectedCount = Object.values(newState.collected).filter(Boolean).length;
    newState.confidence = collectedCount / 3;
    newState.needsClarification = collectedCount < 3;

    setConversationState(newState);

    setTimeout(() => {
      if (!newState.needsClarification) {
        // All info collected - show real results from database
        const formData = extractFormData(newState);
        const results = filterSessions(formData);
        setSessions(results);
        addBotMessage(`Excellent! I found ${results.length} session${results.length !== 1 ? 's' : ''} that match your criteria. Here are your recommendations from our session plans database:`);
        setCurrentStep('results');
      } else {
        // Use mocked response for next question
        const mockedResponse = getMockedBotResponse(label, newState);
        addBotMessage(mockedResponse);
        setCurrentStep('collecting');
      }
    }, 800);
  };

  const handleMockConversation = (conversation: MockConversation) => {
    // Clear existing messages
    setMessages([]);
    setShowSuggestions(false);
    setCurrentStep('collecting');
    setIsAutoPlaying(true);
    
    let currentState: ConversationState = {
      collected: {},
      needsClarification: true,
      confidence: 0,
    };
    
    // Load the mock conversation messages with mocked bot responses
    conversation.messages.forEach((msg: string, i: number) => {
      setTimeout(() => {
        addUserMessage(msg);
        
        // Update state
        currentState = parseUserInput(msg, currentState);
        setConversationState(currentState);
        
        // Add mocked bot response
        setTimeout(() => {
          if (!currentState.needsClarification) {
            // All info collected - show real results
            const formData = extractFormData(currentState);
            const results = filterSessions(formData);
            setSessions(results);
            addBotMessage(`Perfect! I found ${results.length} session${results.length !== 1 ? 's' : ''} that match your criteria. These sessions are pulled directly from our HERDMind session plans database. Swipe through to explore each one in detail.`);
            setCurrentStep('results');
            setIsAutoPlaying(false);
          } else {
            // Use mocked response
            const mockedResponse = getMockedBotResponse(msg, currentState);
            addBotMessage(mockedResponse);
          }
        }, 800);
      }, i * 2000);
    });
  };

  const handleRestart = () => {
    setMessages([]);
    setConversationState({
      collected: {},
      needsClarification: true,
      confidence: 0,
    });
    setSessions([]);
    setCurrentStep('greeting');
    setShowSuggestions(true);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      addBotMessage("Ready to explore more session options? Choose a scenario above to see how I can help you find the perfect match.");
    }, 500);
  };

  // Intro screen
  if (showIntro) {
    return <IntroChat onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg z-10 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
            HM
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm">HERDMind AI Assistant</h3>
            <div className="flex items-center gap-2">
              {isAutoPlaying && (
                <span className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-pulse"></span>
                  Demo in progress...
                </span>
              )}
              {!isAutoPlaying && (
                <p className="text-xs text-gray-500">
                  {currentStep === 'results' ? 'Ready to help' : 'AI-powered session search'}
                </p>
              )}
            </div>
          </div>
          {currentStep !== 'greeting' && !isAutoPlaying && (
            <button
              onClick={handleRestart}
              className="text-xs text-teal-600 font-medium hover:text-teal-700 transition-colors px-3 py-1.5 rounded-md hover:bg-teal-50"
            >
              New Search
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {showTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl px-4 py-3 max-w-[80%]">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Mock Conversation Suggestions (only on greeting) */}
        {currentStep === 'greeting' && showSuggestions && (
          <ConversationSuggestions onSelect={handleMockConversation} />
        )}

        {/* Session Results with Swiper */}
        {currentStep === 'results' && sessions.length > 0 && (
          <SessionSwiper sessions={sessions.slice(0, 5)} />
        )}

        <div ref={scrollRef} />
      </div>

      {/* Demo Controls */}
      {!isAutoPlaying && currentStep === 'results' && (
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4">
          <button
            onClick={handleRestart}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
          >
            Try Another Scenario
          </button>
        </div>
      )}
    </div>
  );
}
