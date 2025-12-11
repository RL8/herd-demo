'use client';

import { useState } from 'react';
import IntroScreen from './IntroScreen';
import FormScreen from './FormScreen';
import ResultsScreen from './ResultsScreen';
import DetailScreen from './DetailScreen';
import FeedbackScreen from './FeedbackScreen';
import { FormData } from '@/lib/sessions';
import { Session } from '@/lib/sessions';

type Screen = 'intro' | 'form' | 'results' | 'detail' | 'feedback';

export default function V1Basic() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [formData, setFormData] = useState<FormData>({});
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    goToScreen('results');
  };

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    goToScreen('detail');
  };

  return (
    <>
      {currentScreen === 'intro' && <IntroScreen onNext={() => goToScreen('form')} />}
      {currentScreen === 'form' && <FormScreen onSubmit={handleFormSubmit} />}
      {currentScreen === 'results' && (
        <ResultsScreen
          formData={formData}
          onBack={() => goToScreen('form')}
          onSessionSelect={handleSessionSelect}
        />
      )}
      {currentScreen === 'detail' && selectedSession && (
        <DetailScreen
          session={selectedSession}
          onBack={() => goToScreen('results')}
          onFeedback={() => goToScreen('feedback')}
        />
      )}
      {currentScreen === 'feedback' && (
        <FeedbackScreen onBack={() => goToScreen('detail')} onComplete={() => goToScreen('results')} />
      )}
    </>
  );
}

