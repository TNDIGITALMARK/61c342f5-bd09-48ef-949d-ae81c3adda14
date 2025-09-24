import { Card } from '@/components/ui/card';
import { DepartmentStats } from '@/types/fire-calls';
import { cn } from '@/lib/utils';
import {
  Phone,
  Activity,
  Clock,
  Truck,
  Users,
  AlertTriangle
} from 'lucide-react';

interface StatsPanelProps {
  stats: DepartmentStats;
  className?: string;
}

export function StatsPanel({ stats, className }: StatsPanelProps) {
  const statItems = [
    {
      label: 'Total Calls (24h)',
      value: stats.totalCalls24h.toString(),
      icon: Phone,
      color: 'text-foreground'
    },
    {
      label: 'Active Calls',
      value: stats.activeCalls.toString(),
      icon: Activity,
      color: stats.activeCalls > 5 ? 'text-warning-orange' : 'text-fire-red'
    },
    {
      label: 'Avg Response Time',
      value: stats.averageResponseTime,
      icon: Clock,
      color: 'text-foreground'
    },
    {
      label: 'Units Available',
      value: stats.unitsAvailable.toString(),
      icon: Truck,
      color: stats.unitsAvailable < 3 ? 'text-warning-orange' : 'text-status-green'
    },
    {
      label: 'Units Deployed',
      value: stats.unitsDeployed.toString(),
      icon: Users,
      color: 'text-fire-red'
    },
    {
      label: 'Out of Service',
      value: stats.unitsOutOfService.toString(),
      icon: AlertTriangle,
      color: stats.unitsOutOfService > 2 ? 'text-warning-orange' : 'text-muted-foreground'
    }
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-lg font-semibold text-foreground">Key Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {statItems.map((item, index) => (
          <Card key={index} className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">
                  {item.label}
                </p>
                <p className={cn('text-xl font-bold', item.color)}>
                  {item.value}
                </p>
              </div>
              <item.icon className={cn('h-5 w-5', item.color)} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  color = 'text-foreground',
  trend,
  trendValue,
  className
}: StatCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-status-green';
      case 'down':
        return 'text-fire-red';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            {label}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className={cn('text-2xl font-bold', color)}>
              {value}
            </p>
            {trend && trendValue && (
              <span className={cn('text-xs font-medium', getTrendColor())}>
                {getTrendIcon()} {trendValue}
              </span>
            )}
          </div>
        </div>
        <Icon className={cn('h-6 w-6', color)} />
      </div>
    </Card>
  );
}