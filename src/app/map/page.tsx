'use client';

import { Navigation } from '@/components/fire-calls/navigation';
import { CallCard } from '@/components/fire-calls/call-card';
import { UnitBadge } from '@/components/fire-calls/unit-badge';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  mockFireCalls,
  mockResponseUnits,
  getActiveCallsCount
} from '@/data/mock-data';
import {
  getPriorityColor,
  getStatusColor,
  getCallTypeIcon,
  getUnitTypeIcon,
  cn
} from '@/lib/utils';
import {
  Map as MapIcon,
  Search,
  Filter,
  Layers,
  ZoomIn,
  ZoomOut,
  Target,
  RefreshCw,
  MapPin,
  Truck
} from 'lucide-react';
import { useState } from 'react';

// Mock map component since we don't have a real map library
function MockMap({ calls, units, filters, selectedItem, onItemClick }: any) {
  const mapStyle = {
    backgroundImage: `
      linear-gradient(rgba(71, 85, 105, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71, 85, 105, 0.3) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
  };

  return (
    <div
      className="relative w-full h-full bg-navy-darkest rounded-lg overflow-hidden"
      style={mapStyle}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-darker/50 to-navy-darkest/50" />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <Button size="sm" variant="outline" className="w-10 h-10 p-0">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="w-10 h-10 p-0">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="w-10 h-10 p-0">
          <Target className="h-4 w-4" />
        </Button>
      </div>

      {/* Fire Calls Markers */}
      {calls.map((call: any, index: number) => {
        const x = 20 + (index * 80) % 400;
        const y = 50 + (index * 60) % 300;

        return (
          <div
            key={call.id}
            className={cn(
              'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110',
              selectedItem?.id === call.id && 'scale-125 z-20'
            )}
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={() => onItemClick(call, 'call')}
          >
            <div className={cn(
              'w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg',
              call.priority === 'critical' && 'bg-emergency-red border-white animate-pulse',
              call.priority === 'high' && 'bg-warning-orange border-white',
              call.priority === 'medium' && 'bg-alert-yellow border-white',
              call.priority === 'low' && 'bg-muted border-white'
            )}>
              <span className="text-xs text-white">
                {getCallTypeIcon(call.type)}
              </span>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-card border border-border px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                {call.callNumber}
              </div>
            </div>
          </div>
        );
      })}

      {/* Unit Markers */}
      {units.map((unit: any, index: number) => {
        const x = 60 + (index * 70) % 450;
        const y = 80 + (index * 90) % 320;

        return (
          <div
            key={unit.id}
            className={cn(
              'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110',
              selectedItem?.id === unit.id && 'scale-125 z-20'
            )}
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={() => onItemClick(unit, 'unit')}
          >
            <div className={cn(
              'w-6 h-6 rounded border flex items-center justify-center shadow-md',
              unit.status === 'available' && 'bg-status-green border-white',
              unit.status === 'dispatched' && 'bg-warning-orange border-white',
              unit.status === 'enroute' && 'bg-alert-yellow border-white',
              unit.status === 'on-scene' && 'bg-fire-red border-white',
              unit.status === 'returning' && 'bg-blue-400 border-white',
              (unit.status === 'out-of-service' || unit.status === 'maintenance') && 'bg-muted border-white'
            )}>
              <span className="text-xs text-white">
                {getUnitTypeIcon(unit.type)}
              </span>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-card border border-border px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                {unit.callSign}
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3">
        <h4 className="font-semibold text-sm mb-2">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emergency-red rounded-full"></div>
            <span>Critical Call</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning-orange rounded-full"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-status-green rounded"></div>
            <span>Available Unit</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-fire-red rounded"></div>
            <span>On Scene</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MapView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'call' | 'unit' | null>(null);
  const [filters, setFilters] = useState({
    calls: true,
    units: true,
    criticalOnly: false,
    availableOnly: false
  });

  const activeCalls = mockFireCalls.filter(call =>
    ['dispatched', 'enroute', 'on-scene', 'contained'].includes(call.status)
  );

  const visibleCalls = activeCalls.filter(call => {
    if (!filters.calls) return false;
    if (filters.criticalOnly && call.priority !== 'critical') return false;
    if (searchTerm) {
      return call.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
             call.callNumber.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const visibleUnits = mockResponseUnits.filter(unit => {
    if (!filters.units) return false;
    if (filters.availableOnly && unit.status !== 'available') return false;
    if (searchTerm) {
      return unit.callSign.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handleItemClick = (item: any, type: 'call' | 'unit') => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  const criticalCalls = visibleCalls.filter(call => call.priority === 'critical');

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeCallsCount={activeCalls.length} />

      <main className="lg:ml-64 p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center">
              <MapIcon className="h-7 w-7 mr-3" />
              Map View
            </h1>
            <p className="text-muted-foreground">Geographic visualization of active calls and units</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            {criticalCalls.length > 0 && (
              <Badge variant="outline" className="bg-emergency-red/10 text-emergency-red border-emergency-red">
                {criticalCalls.length} Critical
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-full p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Live Emergency Map</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{visibleCalls.length} calls</span>
                  <Truck className="h-4 w-4 ml-2" />
                  <span>{visibleUnits.length} units</span>
                </div>
              </div>
              <MockMap
                calls={visibleCalls}
                units={visibleUnits}
                filters={filters}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
              />
            </Card>
          </div>

          {/* Controls & Info Panel */}
          <div className="space-y-4 h-full overflow-y-auto">
            {/* Search & Filters */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>

              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search calls or units..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-calls"
                      checked={filters.calls}
                      onCheckedChange={(checked) =>
                        setFilters(prev => ({ ...prev, calls: checked as boolean }))
                      }
                    />
                    <label htmlFor="show-calls" className="text-sm">Show Calls</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-units"
                      checked={filters.units}
                      onCheckedChange={(checked) =>
                        setFilters(prev => ({ ...prev, units: checked as boolean }))
                      }
                    />
                    <label htmlFor="show-units" className="text-sm">Show Units</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="critical-only"
                      checked={filters.criticalOnly}
                      onCheckedChange={(checked) =>
                        setFilters(prev => ({ ...prev, criticalOnly: checked as boolean }))
                      }
                    />
                    <label htmlFor="critical-only" className="text-sm">Critical Only</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="available-only"
                      checked={filters.availableOnly}
                      onCheckedChange={(checked) =>
                        setFilters(prev => ({ ...prev, availableOnly: checked as boolean }))
                      }
                    />
                    <label htmlFor="available-only" className="text-sm">Available Only</label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Selected Item Details */}
            {selectedItem && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">
                  {selectedType === 'call' ? 'Call Details' : 'Unit Details'}
                </h3>
                {selectedType === 'call' ? (
                  <CallCard call={selectedItem} />
                ) : (
                  <UnitBadge unit={selectedItem} showDetails />
                )}
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                Quick Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Active Calls:</span>
                  <span className="font-semibold">{visibleCalls.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Calls:</span>
                  <span className="font-semibold text-emergency-red">{criticalCalls.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Units Visible:</span>
                  <span className="font-semibold">{visibleUnits.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Units:</span>
                  <span className="font-semibold text-status-green">
                    {visibleUnits.filter(u => u.status === 'available').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Deployed Units:</span>
                  <span className="font-semibold text-fire-red">
                    {visibleUnits.filter(u => ['on-scene', 'enroute'].includes(u.status)).length}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}