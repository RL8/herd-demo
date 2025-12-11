'use client';

import { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import QuickReplies from './QuickReplies';
import ConversationSuggestions, { MockConversation } from './ConversationSuggestions';
import SessionCard from './SessionCard';
import { FormData, filterSessions, Session } from '@/lib/sessions';
import { parseUserInput, generateFollowUpQuestion, extractFormData, ConversationState } from '@/lib/conversationLogic';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
};

type Step = 'greeting' | 'collecting' | 'results' | 'detail';

export default function V3Conversational() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('greeting');
  const [conversationState, setConversationState] = useState<ConversationState>({
    collected: {},
    needsClarification: true,
    confidence: 0,
  });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showTyping, setShowTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('v3-intro-skipped') !== 'true';
    }
    return true;
  });
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mocked bot responses based on user input
  const getMockedBotResponse = (userText: string, state: ConversationState): string => {
    const lowerText = userText.toLowerCase();
    
    // Check what we're collecting
    if (!state.collected.who) {
      if (lowerText.includes('team') || lowerText.includes('organization') || lowerText.includes('leaders')) {
        return "Great! So you're working with a team or organizational group. That's helpful to know. Would you like to use props in the session, or prefer working without them?";
      }
      if (lowerText.includes('individual') || lowerText.includes('one person') || lowerText.includes('client')) {
        return "Perfect! An individual session. Those can be really powerful. Are you thinking of using props, or keeping it simple with just the horses?";
      }
      if (lowerText.includes('group') || lowerText.includes('multiple')) {
        return "A group session - wonderful! Groups can create such rich dynamics. What about props - would you like to incorporate tools or natural objects?";
      }
      return "I'd love to help! To find the best session for you, could you tell me who this is for? Is it a team, an individual, or a group?";
    }
    
    if (!state.collected.props) {
      if (lowerText.includes('physical') || lowerText.includes('tools') || lowerText.includes('cones') || lowerText.includes('poles')) {
        return "Physical tools can add structure and create interesting challenges. What theme are you hoping to explore with this session?";
      }
      if (lowerText.includes('natural') || lowerText.includes('objects') || lowerText.includes('organic')) {
        return "Natural objects invite organic exploration - I love that choice. What's the main theme or focus you want to address?";
      }
      if (lowerText.includes('no props') || lowerText.includes('without') || lowerText.includes('nothing')) {
        return "Sometimes the simplest approach is the most powerful - just horses and humans. What theme would you like to focus on?";
      }
      return "Would you like to use props in this session? We have physical tools, natural objects, or you can work without any props at all.";
    }
    
    if (!state.collected.theme) {
      if (lowerText.includes('identity') || lowerText.includes('belonging')) {
        return "Identity and belonging - such important themes. Let me search our session plans for you...";
      }
      if (lowerText.includes('leadership') || lowerText.includes('communication')) {
        return "Leadership and communication - perfect for team development. Searching for the right sessions...";
      }
      if (lowerText.includes('boundaries') || lowerText.includes('safety')) {
        return "Boundaries and safety - foundational work. Let me find sessions that address these themes...";
      }
      if (lowerText.includes('balance') || lowerText.includes('equilibrium')) {
        return "Balance - both physical and emotional. I'll find sessions that explore this...";
      }
      return "What theme would you like to explore? We have sessions focused on identity, leadership, boundaries, or balance.";
    }
    
    return "Perfect! Let me find sessions that match your needs...";
  };

  useEffect(() => {
    // Initial greeting after intro is dismissed
    if (!showIntro) {
      addBotMessage("Hi! I'm here to help you find the perfect equine session plan. Tell me what you're looking for, or try one of the examples below.");
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
            addBotMessage(`Perfect! I found ${results.length} session${results.length !== 1 ? 's' : ''} that match. Here are your recommendations from our session plans database:`);
            setCurrentStep('results');
          } else {
            // Use mocked response
            const mockedResponse = getMockedBotResponse(msg, currentState);
            addBotMessage(mockedResponse);
          }
        }, 600);
      }, i * 1500);
    });
  };

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setCurrentStep('detail');
    addUserMessage(`Tell me about ${session.session_plan_name}`);
    setTimeout(() => {
      addBotMessage(`Great choice! Here's everything you need to know about "${session.session_plan_name}":`);
    }, 600);
  };

  const handleBack = () => {
    setSelectedSession(null);
    setCurrentStep('results');
    addBotMessage("Would you like to see more sessions?");
  };

  const handleRestart = () => {
    setMessages([]);
    setConversationState({
      collected: {},
      needsClarification: true,
      confidence: 0,
    });
    setSessions([]);
    setSelectedSession(null);
    setCurrentStep('greeting');
    setShowSuggestions(true);
    
    setTimeout(() => {
      addBotMessage("Let's find another session! Tell me what you're looking for.");
    }, 500);
  };

  // Intro screen
  if (showIntro) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 fade-in overflow-y-auto">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-end mb-2">
              <button 
                onClick={() => {
                  if (dontShowAgain) {
                    localStorage.setItem('v3-intro-skipped', 'true');
                  }
                  setShowIntro(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
              HOW TO USE THE SESSION PLANS
            </h1>
            
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 mb-6">
              <p>
                At HERDMind®, we believe that each equine facilitated session is a unique unfolding 
                between the horses and humans present. We truly believe that "It's not about the activity" 
                - the creator of HERDMind, Dr. Veronica Lac, even wrote a book all about that! So, why 
                have we developed this session plan generator?
              </p>
              
              <p>
                We recognize that even the most seasoned practitioner might need some help to think 
                creatively in sessions. We also hear from new practitioners asking for help to get them 
                started with ideas for different client populations.
              </p>
              
              <p>
                All of the session plans that our generator creates are designed using The HERD Institute 
                Model™ as a foundation, so you can adapt, flex, and modify each session however you want 
                to meet the needs of your specific client population.
              </p>
              
              <p className="font-medium text-teal-700">
                These sessions are NOT designed for you to follow step-by-step as tasks to complete. 
                Instead, they offer a broad framework of ideas for you to take and make them your own.
              </p>
              
              <p>
                Each session begins by assuming that you have already covered the basics of safety and 
                confidentiality in your session.
              </p>
              
              <p className="italic">
                Have some ideas of your own? Feel free to share a session plan with us in our discussion forum!
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none text-gray-600">
                <input 
                  type="checkbox" 
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded border-gray-300" 
                />
                Don't show this message again
              </label>
              
              <button
                onClick={() => {
                  if (dontShowAgain) {
                    localStorage.setItem('v3-intro-skipped', 'true');
                  }
                  setShowIntro(false);
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg z-10 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center text-white text-lg font-bold">
            HM
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">HERDMind Assistant</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          {currentStep !== 'greeting' && (
            <button
              onClick={handleRestart}
              className="ml-auto text-xs text-teal-600 font-medium hover:text-teal-700"
            >
              Start Over
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

        {/* Session Results */}
        {currentStep === 'results' && sessions.length > 0 && (
          <div className="space-y-2">
            {sessions.slice(0, 5).map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={() => handleSessionSelect(session)}
              />
            ))}
          </div>
        )}

        {/* Session Detail */}
        {currentStep === 'detail' && selectedSession && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">{selectedSession.session_plan_name}</h4>
            <p className="text-sm text-gray-600 mb-3">{selectedSession.short_description}</p>
            
            {selectedSession.session_objectives && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">Objectives:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  {selectedSession.session_objectives.split('\n').filter(l => l.trim()).slice(0, 2).map((obj, i) => (
                    <p key={i}>• {obj}</p>
                  ))}
                </div>
              </div>
            )}

            {selectedSession.materials_needed && (
              <div className="mb-3 bg-teal-50 rounded-lg p-2">
                <p className="text-xs font-semibold text-teal-900 mb-1">Materials:</p>
                <p className="text-xs text-teal-700">{selectedSession.materials_needed}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={handleBack}
                className="flex-1 text-xs py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                See More
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 text-xs py-2 px-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                New Search
              </button>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input or Quick Replies */}
      {currentStep === 'greeting' || currentStep === 'collecting' ? (
        <>
          {currentStep === 'collecting' && !showTyping && (
            <div className="px-4 pb-2">
              <QuickReplies
                step={conversationState.collected.who ? (conversationState.collected.props ? 'theme' : 'props') : 'who'}
                onWhoSelect={(v, l) => handleQuickReply(v, l, 'who')}
                onPropsSelect={(v, l) => handleQuickReply(v, l, 'props')}
                onThemeSelect={(v, l) => handleQuickReply(v, l, 'theme')}
              />
            </div>
          )}
          <ChatInput
            onSend={handleUserMessage}
            disabled={showTyping}
            placeholder={currentStep === 'greeting' ? "Tell me what you're looking for..." : "Type your response..."}
          />
        </>
      ) : null}
    </div>
  );
}
