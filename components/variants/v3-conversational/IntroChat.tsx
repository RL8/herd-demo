'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatBubble from './ChatBubble';

interface Props {
  onComplete: () => void;
}

const introMessages = [
  { text: "Hi there! Welcome to HERDMind® Session Plans! 🐴", delay: 500 },
  { text: "I'm your AI assistant, and I'm here to help you find the perfect session plan through natural conversation.", delay: 1500 },
  { text: "Before we begin, let me share a few important things about how to use these session plans...", delay: 1800 },
  { text: "At HERDMind®, we believe that each equine facilitated session is a unique unfolding between the horses and humans present.", delay: 2000 },
  { text: "You might be wondering... why have we developed this AI-powered session plan finder if \"it's not about the activity\"?", delay: 2200 },
  { text: "We recognize that even seasoned practitioners sometimes need creative inspiration. And new practitioners often ask for help getting started with different client populations.", delay: 2200 },
  { text: "All our session plans are built on The HERD Institute Model™ foundation. You can adapt, flex, and modify each one to meet your specific client needs.", delay: 2200 },
  { text: "Here's the most important thing: These sessions are NOT step-by-step tasks to follow. They're broad frameworks of ideas for you to make your own. 💡", delay: 2200 },
  { text: "Each session assumes you've already covered safety and confidentiality basics with your clients.", delay: 1800 },
  { text: "In this demo, you'll see how I understand natural conversation and search through our complete database to recommend the best sessions for your needs.", delay: 2000 },
  { text: "Ready to see the AI in action?", delay: 1200 }
];

export default function IntroChat({ onComplete }: Props) {
  const [displayedMessages, setDisplayedMessages] = useState<Array<{id: string, text: string, sender: 'bot' | 'user', timestamp: Date}>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < introMessages.length) {
      const message = introMessages[currentIndex];
      
      // Show typing indicator
      setShowTyping(true);
      
      const timer = setTimeout(() => {
        // Hide typing and add message
        setShowTyping(false);
        setDisplayedMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: message.text,
          timestamp: new Date()
        }]);
        
        // Move to next message
        setCurrentIndex(currentIndex + 1);
      }, message.delay);

      return () => clearTimeout(timer);
    } else if (currentIndex === introMessages.length && !showButtons) {
      // All messages shown, show action buttons
      setTimeout(() => {
        setShowButtons(true);
      }, 500);
    }
  }, [currentIndex, showButtons]);

  useEffect(() => {
    // Auto-scroll to bottom
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, showTyping]);

  const handleGetStarted = () => {
    if (dontShowAgain) {
      localStorage.setItem('v3-intro-skipped', 'true');
    }
    onComplete();
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('v3-intro-skipped', 'true');
    }
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg z-10 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
              HM
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">HERDMind AI Assistant</h3>
              <p className="text-xs text-teal-600 font-medium">Demo Mode</p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Skip →
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {displayedMessages.map((message) => (
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

        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 pt-4"
          >
            <label className="flex items-center justify-center gap-2 text-sm cursor-pointer select-none text-gray-600 bg-gray-50 p-3 rounded-lg">
              <input 
                type="checkbox" 
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-gray-300" 
              />
              Don't show this intro again
            </label>
            
            <button
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all"
            >
              Let's Get Started! 🚀
            </button>
          </motion.div>
        )}

        <div ref={scrollRef} />
      </div>
    </div>
  );
}

