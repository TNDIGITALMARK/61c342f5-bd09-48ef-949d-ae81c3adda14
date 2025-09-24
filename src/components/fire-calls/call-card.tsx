import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FireCall } from '@/types/fire-calls';
import {
  formatElapsedTime,
  formatTime,
  getPriorityColor,
  getStatusColor,
  getCallTypeIcon,
  cn
} from '@/lib/utils';
import { Clock, MapPin, Users } from 'lucide-react';

interface CallCardProps {
  call: FireCall;
  onClick?: (call: FireCall) => void;
  className?: string;
}

export function CallCard({ call, onClick, className }: CallCardProps) {
  const elapsed = formatElapsedTime(call.dispatchTime);
  const priorityColor = getPriorityColor(call.priority);
  const statusColor = getStatusColor(call.status);

  return (
    <Card
      className={cn(
        'p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-4',
        call.priority === 'critical' && 'border-l-emergency-red',
        call.priority === 'high' && 'border-l-warning-orange',
        call.priority === 'medium' && 'border-l-alert-yellow',
        call.priority === 'low' && 'border-l-muted-foreground',
        className
      )}
      onClick={() => onClick?.(call)}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getCallTypeIcon(call.type)}</span>
            <div>
              <div className="font-semibold text-sm text-foreground">
                {call.callNumber}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {call.type.replace('-', ' ')}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge
              variant="outline"
              className={cn('text-xs px-2 py-0.5', priorityColor)}
            >
              {call.priority.toUpperCase()}
            </Badge>
            <Badge
              variant="outline"
              className={cn('text-xs px-2 py-0.5', statusColor)}
            >
              {call.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-foreground">
            <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
            <span className="truncate">{call.address}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Dispatched {formatTime(call.dispatchTime)}</span>
            </div>
            <div className="flex items-center">
              <span className="font-mono text-fire-red">{elapsed}</span>
            </div>
          </div>

          {call.assignedUnits.length > 0 && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-2" />
              <span className="truncate">
                {call.assignedUnits.join(', ')}
              </span>
            </div>
          )}
        </div>

        {call.description && (
          <div className="text-xs text-muted-foreground line-clamp-2 mt-2 pt-2 border-t border-muted">
            {call.description}
          </div>
        )}
      </div>
    </Card>
  );
}