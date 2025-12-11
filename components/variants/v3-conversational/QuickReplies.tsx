import { Users, User, UsersRound, Target, Leaf, X, UserCircle, Star, Shield, Scale, LucideIcon } from 'lucide-react';

type Step = 'who' | 'props' | 'theme';

interface Props {
  step: Step;
  onWhoSelect: (value: string, label: string) => void;
  onPropsSelect: (value: string, label: string) => void;
  onThemeSelect: (value: string, label: string) => void;
}

export default function QuickReplies({ step, onWhoSelect, onPropsSelect, onThemeSelect }: Props) {
  const whoOptions: { value: string; label: string; icon: LucideIcon }[] = [
    { value: 'teams', label: 'Teams', icon: Users },
    { value: 'individuals', label: 'Individuals', icon: User },
    { value: 'groups', label: 'Groups', icon: UsersRound },
  ];

  const propOptions: { value: string; label: string; icon: LucideIcon }[] = [
    { value: 'physical', label: 'Physical Tools', icon: Target },
    { value: 'natural', label: 'Natural Objects', icon: Leaf },
    { value: 'none', label: 'No Props', icon: X },
  ];

  const themeOptions: { value: string; label: string; icon: LucideIcon }[] = [
    { value: 'identity', label: 'Identity & Belonging', icon: UserCircle },
    { value: 'leadership', label: 'Leadership', icon: Star },
    { value: 'boundaries', label: 'Boundaries', icon: Shield },
    { value: 'balance', label: 'Balance', icon: Scale },
  ];

  const getOptions = () => {
    switch (step) {
      case 'who':
        return whoOptions;
      case 'props':
        return propOptions;
      case 'theme':
        return themeOptions;
      default:
        return [];
    }
  };

  const handleSelect = (value: string, label: string) => {
    switch (step) {
      case 'who':
        onWhoSelect(value, label);
        break;
      case 'props':
        onPropsSelect(value, label);
        break;
      case 'theme':
        onThemeSelect(value, label);
        break;
    }
  };

  const options = getOptions();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value, option.label)}
            className="bg-white border-2 border-teal-600 text-teal-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <Icon className="w-4 h-4" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

