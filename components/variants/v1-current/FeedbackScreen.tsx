'use client';

import { useState } from 'react';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

export default function FeedbackScreen({ onBack, onComplete }: Props) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // In a real app, this would save to database
    alert('Thank you for your feedback!');
    onComplete();
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center p-6 fade-in">
      <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg">
        HM
      </div>
      
      <h2 className="text-teal-700 font-bold uppercase tracking-wide text-sm mb-8">
        WE APPRECIATE YOUR FEEDBACK
      </h2>

      <div className="w-full max-w-md">
        <p className="text-center mb-2 text-sm text-gray-600">Want to add a comment?</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
          placeholder="Enter Feedback"
        />
        
        <div className="flex justify-center gap-4 text-2xl my-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="text-teal-600 cursor-pointer transition-transform hover:scale-110"
            >
              <svg
                className="w-8 h-8"
                fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors"
          >
            RATE SESSION
          </button>
          <button
            onClick={onBack}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-500 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

