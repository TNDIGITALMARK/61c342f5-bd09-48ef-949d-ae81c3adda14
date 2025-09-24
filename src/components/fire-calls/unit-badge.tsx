import { Badge } from '@/components/ui/badge';
import { ResponseUnit } from '@/types/fire-calls';
import {
  getUnitStatusColor,
  getUnitTypeIcon,
  cn
} from '@/lib/utils';
import { MapPin, Users } from 'lucide-react';

interface UnitBadgeProps {
  unit: ResponseUnit;
  showDetails?: boolean;
  onClick?: (unit: ResponseUnit) => void;
  className?: string;
}

export function UnitBadge({ unit, showDetails = false, onClick, className }: UnitBadgeProps) {
  const statusColor = getUnitStatusColor(unit.status);

  if (!showDetails) {
    return (
      <Badge
        variant="outline"
        className={cn(
          'cursor-pointer hover:opacity-80 text-xs px-2 py-1',
          statusColor,
          className
        )}
        onClick={() => onClick?.(unit)}
      >
        <span className="mr-1">{getUnitTypeIcon(unit.type)}</span>
        {unit.callSign}
      </Badge>
    );
  }

  return (
    <div
      className={cn(
        'p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors',
        className
      )}
      onClick={() => onClick?.(unit)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getUnitTypeIcon(unit.type)}</span>
          <div>
            <div className="font-semibold text-sm">{unit.callSign}</div>
            <div className="text-xs text-muted-foreground capitalize">
              {unit.type}
            </div>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn('text-xs px-2 py-0.5', statusColor)}
        >
          {unit.status.replace('-', ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        {unit.location && (
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>
              {unit.location.lat.toFixed(4)}, {unit.location.lng.toFixed(4)}
            </span>
          </div>
        )}

        {unit.crew.length > 0 && (
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{unit.crew.length} crew members</span>
          </div>
        )}

        {unit.currentCallId && (
          <div className="text-fire-red text-xs font-mono">
            Assigned to {unit.currentCallId}
          </div>
        )}
      </div>
    </div>
  );
}