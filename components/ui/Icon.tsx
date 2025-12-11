import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export default function Icon({ icon: IconComponent, size = 24, className }: IconProps) {
  return (
    <IconComponent
      size={size}
      className={cn('stroke-2', className)}
    />
  );
}

