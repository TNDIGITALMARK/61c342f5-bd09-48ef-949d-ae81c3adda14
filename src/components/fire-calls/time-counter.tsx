'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { formatElapsedTime } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface TimeCounterProps {
  startTime: Date;
  endTime?: Date;
  label?: string;
  critical?: boolean;
  className?: string;
}

export function TimeCounter({ startTime, endTime, label, critical = false, className }: TimeCounterProps) {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    const updateElapsed = () => {
      const time = formatElapsedTime(startTime);
      setElapsed(time);
    };

    if (!endTime) {
      updateElapsed();
      const interval = setInterval(updateElapsed, 1000);
      return () => clearInterval(interval);
    } else {
      setElapsed(formatElapsedTime(startTime));
    }
  }, [startTime, endTime]);

  const isLongDuration = () => {
    const now = endTime || new Date();
    const diffMs = now.getTime() - startTime.getTime();
    return diffMs > 1800000; // 30 minutes
  };

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <Clock className={cn(
        'h-4 w-4',
        critical && 'text-emergency-red',
        isLongDuration() && 'text-warning-orange'
      )} />
      <div className="flex flex-col">
        {label && (
          <span className="text-xs text-muted-foreground">{label}</span>
        )}
        <span className={cn(
          'font-mono text-sm font-semibold',
          critical && 'text-emergency-red',
          isLongDuration() && !critical && 'text-warning-orange',
          !critical && !isLongDuration() && 'text-foreground'
        )}>
          {elapsed}
        </span>
      </div>
    </div>
  );
}

interface ResponseTimeDisplayProps {
  dispatchTime: Date;
  responseTime?: Date;
  arrivalTime?: Date;
  className?: string;
}

export function ResponseTimeDisplay({
  dispatchTime,
  responseTime,
  arrivalTime,
  className
}: ResponseTimeDisplayProps) {
  const getResponseTime = () => {
    if (!responseTime) return '--:--';
    const diffMs = responseTime.getTime() - dispatchTime.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getArrivalTime = () => {
    if (!arrivalTime) return '--:--';
    const diffMs = arrivalTime.getTime() - dispatchTime.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const responseTimeValue = getResponseTime();
  const arrivalTimeValue = getArrivalTime();

  return (
    <div className={cn('grid grid-cols-2 gap-4 text-xs', className)}>
      <div className="text-center">
        <div className="text-muted-foreground mb-1">Response Time</div>
        <div className={cn(
          'font-mono font-semibold',
          responseTime ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {responseTimeValue}
        </div>
      </div>
      <div className="text-center">
        <div className="text-muted-foreground mb-1">Arrival Time</div>
        <div className={cn(
          'font-mono font-semibold',
          arrivalTime ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {arrivalTimeValue}
        </div>
      </div>
    </div>
  );
}