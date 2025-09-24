'use client';

import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { CallVolumeTrend } from '@/types/fire-calls';
import { cn } from '@/lib/utils';

interface CallVolumeChartProps {
  data: CallVolumeTrend[];
  type?: 'line' | 'area' | 'bar';
  className?: string;
}

export function CallVolumeChart({ data, type = 'area', className }: CallVolumeChartProps) {
  const chartData = data.map(item => ({
    ...item,
    hour: item.hour.toString().padStart(2, '0') + ':00'
  }));

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-fire-red">
            {`Calls: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="hsl(var(--fire-red))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--fire-red))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--fire-red))', strokeWidth: 2 }}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={customTooltip} />
            <Area
              type="monotone"
              dataKey="calls"
              stroke="hsl(var(--fire-red))"
              fill="hsl(var(--fire-red) / 0.2)"
              strokeWidth={2}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={customTooltip} />
            <Bar
              dataKey="calls"
              fill="hsl(var(--fire-red))"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Call Volume Trends</h3>
        <div className="text-xs text-muted-foreground">Last 24 Hours</div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

interface CallTypeBreakdownProps {
  data: Array<{ name: string; value: number; color: string; }>;
  className?: string;
}

export function CallTypeBreakdown({ data, className }: CallTypeBreakdownProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={cn('p-4', className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Call Types Distribution
      </h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}