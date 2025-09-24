import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatElapsedTime(startTime: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - startTime.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours > 0) {
    const remainingMinutes = diffMinutes % 60;
    return `${diffHours}:${remainingMinutes.toString().padStart(2, '0')}`;
  }
  return `${diffMinutes}:00`;
}

export function formatResponseTime(dispatch: Date, arrival?: Date): string {
  if (!arrival) return '--:--';

  const diffMs = arrival.getTime() - dispatch.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffSeconds = Math.floor((diffMs % 60000) / 1000);

  return `${diffMinutes}:${diffSeconds.toString().padStart(2, '0')}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'critical':
      return 'text-emergency-red border-emergency-red bg-emergency-red/10';
    case 'high':
      return 'text-warning-orange border-warning-orange bg-warning-orange/10';
    case 'medium':
      return 'text-alert-yellow border-alert-yellow bg-alert-yellow/10';
    case 'low':
      return 'text-muted-foreground border-muted bg-muted/10';
    default:
      return 'text-muted-foreground border-muted bg-muted/10';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'dispatched':
      return 'text-warning-orange bg-warning-orange/10';
    case 'enroute':
      return 'text-alert-yellow bg-alert-yellow/10';
    case 'on-scene':
      return 'text-fire-red bg-fire-red/10';
    case 'contained':
    case 'controlled':
      return 'text-status-green bg-status-green/10';
    case 'cleared':
      return 'text-muted-foreground bg-muted/10';
    case 'cancelled':
      return 'text-muted-foreground bg-muted/10';
    default:
      return 'text-muted-foreground bg-muted/10';
  }
}

export function getUnitStatusColor(status: string): string {
  switch (status) {
    case 'available':
      return 'text-status-green bg-status-green/10';
    case 'dispatched':
      return 'text-warning-orange bg-warning-orange/10';
    case 'enroute':
      return 'text-alert-yellow bg-alert-yellow/10';
    case 'on-scene':
      return 'text-fire-red bg-fire-red/10';
    case 'returning':
      return 'text-blue-400 bg-blue-400/10';
    case 'out-of-service':
    case 'maintenance':
      return 'text-muted-foreground bg-muted/10';
    default:
      return 'text-muted-foreground bg-muted/10';
  }
}

export function getCallTypeIcon(type: string): string {
  switch (type) {
    case 'structure-fire':
      return '🔥';
    case 'vehicle-fire':
      return '🚗';
    case 'wildland-fire':
      return '🌲';
    case 'medical-emergency':
      return '🚑';
    case 'vehicle-accident':
      return '💥';
    case 'hazmat':
      return '☢️';
    case 'rescue':
      return '🏔️';
    case 'false-alarm':
      return '🚨';
    default:
      return '📋';
  }
}

export function getUnitTypeIcon(type: string): string {
  switch (type) {
    case 'engine':
      return '🚒';
    case 'ladder':
      return '🪜';
    case 'rescue':
      return '🛟';
    case 'ambulance':
      return '🚑';
    case 'chief':
      return '👨‍🚒';
    case 'hazmat':
      return '☢️';
    case 'brush':
      return '🌲';
    case 'support':
      return '🔧';
    default:
      return '🛟';
  }
}
