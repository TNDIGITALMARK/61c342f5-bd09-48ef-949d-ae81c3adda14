'use client';

import { Navigation } from '@/components/fire-calls/navigation';
import { CallCard } from '@/components/fire-calls/call-card';
import { UnitBadge } from '@/components/fire-calls/unit-badge';
import { StatsPanel } from '@/components/fire-calls/stats-panel';
import { CallVolumeChart, CallTypeBreakdown } from '@/components/fire-calls/call-volume-chart';
import { TimeCounter } from '@/components/fire-calls/time-counter';
import {
  mockFireCalls,
  mockResponseUnits,
  mockDepartmentStats,
  mockCallVolumeTrend,
  getActiveCallsCount,
  getUnitsByStatus
} from '@/data/mock-data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Plus,
  Bell,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const activeCalls = mockFireCalls.filter(call =>
    ['dispatched', 'enroute', 'on-scene', 'contained'].includes(call.status)
  );

  const availableUnits = getUnitsByStatus('available');
  const deployedUnits = getUnitsByStatus('on-scene').concat(getUnitsByStatus('enroute'));

  const callTypeBreakdownData = [
    { name: 'Structure Fire', value: 8, color: 'hsl(var(--fire-red))' },
    { name: 'Medical Emergency', value: 12, color: 'hsl(var(--emergency-red))' },
    { name: 'Vehicle Accident', value: 5, color: 'hsl(var(--warning-orange))' },
    { name: 'False Alarm', value: 2, color: 'hsl(var(--muted-foreground))' },
  ];

  const criticalCalls = activeCalls.filter(call => call.priority === 'critical');

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeCallsCount={activeCalls.length} />

      <main className="lg:ml-64 p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fire Calls Dashboard</h1>
            <p className="text-muted-foreground">Real-time emergency response command center</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Call
            </Button>
            {criticalCalls.length > 0 && (
              <Button variant="destructive" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {criticalCalls.length} Critical
              </Button>
            )}
          </div>
        </div>

        {/* Critical Alerts */}
        {criticalCalls.length > 0 && (
          <Card className="p-4 border-emergency-red bg-emergency-red/5">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-emergency-red animate-pulse" />
              <div>
                <h3 className="font-semibold text-emergency-red">Critical Emergency</h3>
                <p className="text-sm text-muted-foreground">
                  {criticalCalls.length} critical {criticalCalls.length === 1 ? 'call' : 'calls'} requiring immediate attention
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Panel */}
        <StatsPanel stats={mockDepartmentStats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Active Calls Column */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center">
                Active Calls
                <Badge variant="outline" className="ml-2 bg-fire-red/10 text-fire-red border-fire-red">
                  {activeCalls.length}
                </Badge>
              </h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search calls..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {activeCalls.map(call => (
                <CallCard key={call.id} call={call} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Available Units */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                Available Units
                <Badge variant="outline" className="ml-2 bg-status-green/10 text-status-green border-status-green">
                  {availableUnits.length}
                </Badge>
              </h3>
              <div className="space-y-2">
                {availableUnits.slice(0, 6).map(unit => (
                  <UnitBadge key={unit.id} unit={unit} showDetails />
                ))}
              </div>
            </Card>

            {/* Deployed Units */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                Deployed Units
                <Badge variant="outline" className="ml-2 bg-warning-orange/10 text-warning-orange border-warning-orange">
                  {deployedUnits.length}
                </Badge>
              </h3>
              <div className="space-y-2">
                {deployedUnits.slice(0, 4).map(unit => (
                  <UnitBadge key={unit.id} unit={unit} showDetails />
                ))}
              </div>
            </Card>

            {/* Response Time Counter */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">Response Times</h3>
              <div className="space-y-3">
                {activeCalls.slice(0, 3).map(call => (
                  <div key={call.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{call.callNumber}</div>
                      <div className="text-xs text-muted-foreground">{call.type}</div>
                    </div>
                    <TimeCounter
                      startTime={call.dispatchTime}
                      critical={call.priority === 'critical'}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CallVolumeChart
            data={mockCallVolumeTrend}
            type="area"
            key={refreshKey}
          />
          <CallTypeBreakdown data={callTypeBreakdownData} />
        </div>
      </main>
    </div>
  );
}