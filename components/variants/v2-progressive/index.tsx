'use client';

import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import WizardForm from './WizardForm';
import ResultsScreen from './ResultsScreen';
import DetailScreen from './DetailScreen';
import { FormData, Session } from '@/lib/sessions';

type Screen = 'welcome' | 'form' | 'results' | 'detail';

export default function V2Progressive() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
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
      {currentScreen === 'welcome' && <WelcomeScreen onNext={() => goToScreen('form')} />}
      {currentScreen === 'form' && <WizardForm onSubmit={handleFormSubmit} />}
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
        />
      )}
    </>
  );
}
