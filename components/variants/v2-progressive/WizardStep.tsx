'use client';

import { ReactNode } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  step: number;
  total: number;
  title: string;
  description?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  canGoNext?: boolean;
  nextLabel?: string;
}

export default function WizardStep({
  step,
  total,
  title,
  description,
  children,
  onBack,
  onNext,
  canGoNext = false,
  nextLabel = 'Next',
}: Props) {
  return (
    <div className="min-h-full flex flex-col p-6 fade-in pb-24">
      {/* Progress */}
      <div className="mb-6">
        <Progress current={step} total={total} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed px-4">
          {description}
        </p>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        {onNext && (
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex-1 bg-teal-600 hover:bg-teal-700"
          >
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

