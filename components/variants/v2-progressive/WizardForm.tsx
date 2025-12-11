'use client';

import { useState, useEffect } from 'react';
import { FormData, filterSessions } from '@/lib/sessions';
import WizardStep from './WizardStep';
import { Users, User, UsersRound, Target, Leaf, X, UserCircle, Star, Shield, Scale } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/Icon';

interface Props {
  onSubmit: (data: FormData) => void;
}

interface Option {
  id: string;
  label: string;
  icon: typeof Users;
}

export default function WizardForm({ onSubmit }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [who, setWho] = useState('');
  const [props, setProps] = useState('');
  const [theme, setTheme] = useState('');
  const [resultCount, setResultCount] = useState(0);

  const whoOptions: Option[] = [
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'individuals', label: 'Individuals', icon: User },
    { id: 'groups', label: 'Groups', icon: UsersRound },
  ];

  const propOptions: Option[] = [
    { id: 'physical', label: 'Physical Tools', icon: Target },
    { id: 'natural', label: 'Natural Objects', icon: Leaf },
    { id: 'none', label: 'No Props', icon: X },
  ];

  const themeOptions: Option[] = [
    { id: 'identity', label: 'Identity', icon: UserCircle },
    { id: 'leadership', label: 'Leadership', icon: Star },
    { id: 'boundaries', label: 'Boundaries', icon: Shield },
    { id: 'balance', label: 'Balance', icon: Scale },
  ];

  // Update result count
  useEffect(() => {
    const formData: FormData = {};
    if (who) formData.who = who;
    if (props) formData.props = props;
    if (theme) formData.theme = theme;
    
    const sessions = filterSessions(formData);
    setResultCount(sessions.length);
  }, [who, props, theme]);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit({ who, props, theme });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-3">
            {whoOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = who === option.id;
              return (
                <Card
                  key={option.id}
                  onClick={() => setWho(option.id)}
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-gray-900">{option.label}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        );

      case 1:
        return (
          <div className="space-y-3">
            {propOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = props === option.id;
              return (
                <Card
                  key={option.id}
                  onClick={() => setProps(option.id)}
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-gray-900">{option.label}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            {themeOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = theme === option.id;
              return (
                <Card
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-gray-900">{option.label}</span>
                  </div>
                </Card>
              );
            })}
            {resultCount > 0 && (
              <div className="mt-6 text-center p-4 bg-teal-50 rounded-xl border border-teal-200">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-teal-700 text-lg">{resultCount}</span> sessions match your selections
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return 'Who is this session for?';
      case 1:
        return 'Want to include props?';
      case 2:
        return 'Choose a theme';
      default:
        return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return 'Understanding your client population helps us match you with sessions designed for their specific needs. Whether working with individuals, small groups, or organizational teams, each has unique dynamics that influence session design.';
      case 1:
        return 'Props can enhance or simplify your session. Physical tools like cones and poles create structured activities, while natural objects invite organic exploration. No props means focusing purely on the relationship between humans and horses.';
      case 2:
        return 'The theme guides the session\'s focus and learning objectives. Each theme addresses different aspects of personal growth, from building confidence to exploring identity, finding safety, rediscovering balance, or navigating relational dynamics.';
      default:
        return '';
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 0:
        return !!who;
      case 1:
        return !!props;
      case 2:
        return !!theme;
      default:
        return false;
    }
  };

  return (
    <WizardStep
      step={currentStep + 1}
      total={3}
      title={getStepTitle()}
      description={getStepDescription()}
      onBack={currentStep > 0 ? handleBack : undefined}
      onNext={handleNext}
      canGoNext={canGoNext()}
      nextLabel={currentStep === 2 ? 'View Sessions' : 'Next'}
    >
      {renderStepContent()}
    </WizardStep>
  );
}

