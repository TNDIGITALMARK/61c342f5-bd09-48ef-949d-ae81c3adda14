import { cn } from '@/lib/utils';
import { Priority } from '@/types/fire-calls';

interface PriorityIndicatorProps {
  priority: Priority;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriorityIndicator({ priority, size = 'md', className }: PriorityIndicatorProps) {
  const baseClasses = 'rounded-full flex items-center justify-center font-bold';

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const priorityStyles = {
    critical: {
      bg: 'bg-emergency-red',
      text: 'text-white',
      pulse: 'animate-pulse',
      number: '1'
    },
    high: {
      bg: 'bg-warning-orange',
      text: 'text-white',
      pulse: '',
      number: '2'
    },
    medium: {
      bg: 'bg-alert-yellow',
      text: 'text-black',
      pulse: '',
      number: '3'
    },
    low: {
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      pulse: '',
      number: '4'
    }
  };

  const style = priorityStyles[priority];

  return (
    <div
      className={cn(
        baseClasses,
        sizeClasses[size],
        style.bg,
        style.text,
        style.pulse,
        className
      )}
      title={`Priority: ${priority.toUpperCase()}`}
    >
      {style.number}
    </div>
  );
}

interface PriorityBarProps {
  priority: Priority;
  className?: string;
}

export function PriorityBar({ priority, className }: PriorityBarProps) {
  const priorityColors = {
    critical: 'bg-emergency-red',
    high: 'bg-warning-orange',
    medium: 'bg-alert-yellow',
    low: 'bg-muted'
  };

  const priorityWidths = {
    critical: 'w-full',
    high: 'w-3/4',
    medium: 'w-2/4',
    low: 'w-1/4'
  };

  return (
    <div className={cn('w-full h-1 bg-muted rounded-full overflow-hidden', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-300',
          priorityColors[priority],
          priorityWidths[priority],
          priority === 'critical' && 'animate-pulse'
        )}
      />
    </div>
  );
}