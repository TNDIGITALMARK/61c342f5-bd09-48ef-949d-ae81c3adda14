'use client';

import { Navigation } from '@/components/fire-calls/navigation';
import { UnitBadge } from '@/components/fire-calls/unit-badge';
import { PriorityIndicator, PriorityBar } from '@/components/fire-calls/priority-indicator';
import { TimeCounter, ResponseTimeDisplay } from '@/components/fire-calls/time-counter';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  mockFireCalls,
  mockResponseUnits,
  getCallById,
  getUnitById,
  getActiveCallsCount
} from '@/data/mock-data';
import {
  getStatusColor,
  getPriorityColor,
  getCallTypeIcon,
  formatTime,
  formatDate,
  cn
} from '@/lib/utils';
import {
  MapPin,
  Clock,
  Users,
  Phone,
  FileText,
  Edit3,
  Save,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Radio
} from 'lucide-react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CallStatus, Priority } from '@/types/fire-calls';

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();
  const callId = params.id as string;

  const call = getCallById(callId);
  const assignedUnits = call?.assignedUnits.map(unitId =>
    mockResponseUnits.find(unit => unit.id === unitId)
  ).filter(Boolean) || [];

  const [isEditing, setIsEditing] = useState(false);
  const [editingNotes, setEditingNotes] = useState(call?.notes || '');
  const [editingStatus, setEditingStatus] = useState<CallStatus>(call?.status || 'dispatched');
  const [editingPriority, setEditingPriority] = useState<Priority>(call?.priority || 'medium');

  if (!call) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="lg:ml-64 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Call Not Found</h1>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </main>
      </div>
    );
  }

  const statusColor = getStatusColor(call.status);
  const priorityColor = getPriorityColor(call.priority);

  const handleSave = () => {
    setIsEditing(false);
  };

  const statusOptions: { value: CallStatus; label: string; icon: any }[] = [
    { value: 'dispatched', label: 'Dispatched', icon: Radio },
    { value: 'enroute', label: 'En Route', icon: Clock },
    { value: 'on-scene', label: 'On Scene', icon: MapPin },
    { value: 'contained', label: 'Contained', icon: CheckCircle },
    { value: 'controlled', label: 'Controlled', icon: CheckCircle },
    { value: 'cleared', label: 'Cleared', icon: CheckCircle },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle },
  ];

  const priorityOptions: { value: Priority; label: string }[] = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeCallsCount={getActiveCallsCount()} />

      <main className="lg:ml-64 p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getCallTypeIcon(call.type)}</span>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{call.callNumber}</h1>
                <p className="text-muted-foreground capitalize">
                  {call.type.replace('-', ' ')} • Dispatched {formatTime(call.dispatchTime)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Call Information */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Call Information</h2>
                <div className="flex items-center space-x-2">
                  <PriorityIndicator priority={call.priority} />
                  {isEditing ? (
                    <Select value={editingStatus} onValueChange={(value: CallStatus) => setEditingStatus(value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center space-x-2">
                              <option.icon className="h-3 w-3" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="outline" className={cn('px-3 py-1', statusColor)}>
                      {call.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{call.address}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Priority</label>
                    <div className="mt-2">
                      {isEditing ? (
                        <Select value={editingPriority} onValueChange={(value: Priority) => setEditingPriority(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {priorityOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className={cn('px-2 py-1', priorityColor)}>
                              {call.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <PriorityBar priority={call.priority} />
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Reporting Party</label>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{call.reportingParty || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Response Times</label>
                    <div className="mt-2">
                      <ResponseTimeDisplay
                        dispatchTime={call.dispatchTime}
                        responseTime={call.responseTime}
                        arrivalTime={call.arrivalTime}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Elapsed Time</label>
                    <div className="mt-2">
                      <TimeCounter
                        startTime={call.dispatchTime}
                        endTime={call.clearedTime}
                        critical={call.priority === 'critical'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                    <div className="text-foreground font-mono text-sm mt-1">
                      {call.coordinates.lat.toFixed(6)}, {call.coordinates.lng.toFixed(6)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <p className="text-foreground">{call.description}</p>
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Notes & Updates
                </h2>
              </div>

              {isEditing ? (
                <Textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add notes or updates..."
                  className="min-h-[120px]"
                />
              ) : (
                <div className="p-3 bg-muted rounded-lg min-h-[120px]">
                  <p className="text-foreground">{call.notes || 'No notes available'}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Units */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Assigned Units
                <Badge variant="outline" className="ml-2">
                  {assignedUnits.length}
                </Badge>
              </h3>
              <div className="space-y-3">
                {assignedUnits.map(unit => (
                  unit && <UnitBadge key={unit.id} unit={unit} showDetails />
                ))}
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Dispatched</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(call.dispatchTime)}
                    </div>
                  </div>
                </div>

                {call.responseTime && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning-orange/20 text-warning-orange rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Units Responded</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(call.responseTime)}
                      </div>
                    </div>
                  </div>
                )}

                {call.arrivalTime && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-fire-red/20 text-fire-red rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">On Scene</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(call.arrivalTime)}
                      </div>
                    </div>
                  </div>
                )}

                {call.clearedTime && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-status-green/20 text-status-green rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Cleared</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(call.clearedTime)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}