'use client';

import { useState, useEffect } from 'react';
import { FireCall, ResponseUnit, CallStatus, UnitStatus } from '@/types/fire-calls';

export function useRealTimeUpdates(initialCalls: FireCall[], initialUnits: ResponseUnit[]) {
  const [calls, setCalls] = useState(initialCalls);
  const [units, setUnits] = useState(initialUnits);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // Randomly update call statuses
      setCalls(prevCalls => {
        const updatedCalls = prevCalls.map(call => {
          // Only update active calls
          if (!['dispatched', 'enroute', 'on-scene', 'contained'].includes(call.status)) {
            return call;
          }

          const random = Math.random();
          let newStatus: CallStatus = call.status;

          // Progress calls through stages with some probability
          if (call.status === 'dispatched' && random < 0.3) {
            newStatus = 'enroute';
          } else if (call.status === 'enroute' && random < 0.4) {
            newStatus = 'on-scene';
          } else if (call.status === 'on-scene' && random < 0.2) {
            newStatus = 'contained';
          } else if (call.status === 'contained' && random < 0.1) {
            newStatus = 'cleared';
          }

          return {
            ...call,
            status: newStatus,
            responseTime: newStatus === 'enroute' && !call.responseTime ? new Date() : call.responseTime,
            arrivalTime: newStatus === 'on-scene' && !call.arrivalTime ? new Date() : call.arrivalTime,
            clearedTime: newStatus === 'cleared' && !call.clearedTime ? new Date() : call.clearedTime,
          };
        });
        return updatedCalls;
      });

      // Randomly update unit statuses
      setUnits(prevUnits => {
        return prevUnits.map(unit => {
          if (unit.status === 'maintenance') return unit;

          const random = Math.random();
          let newStatus: UnitStatus = unit.status;

          // Simulate unit movements and status changes
          if (unit.status === 'available' && random < 0.1) {
            newStatus = 'dispatched';
          } else if (unit.status === 'dispatched' && random < 0.3) {
            newStatus = 'enroute';
          } else if (unit.status === 'enroute' && random < 0.4) {
            newStatus = 'on-scene';
          } else if (unit.status === 'on-scene' && random < 0.2) {
            newStatus = 'returning';
          } else if (unit.status === 'returning' && random < 0.5) {
            newStatus = 'available';
          }

          return {
            ...unit,
            status: newStatus,
          };
        });
      });

      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const addNewCall = (call: FireCall) => {
    setCalls(prev => [call, ...prev]);
  };

  const updateCallStatus = (callId: string, status: CallStatus) => {
    setCalls(prev =>
      prev.map(call =>
        call.id === callId ? { ...call, status } : call
      )
    );
  };

  const updateUnitStatus = (unitId: string, status: UnitStatus) => {
    setUnits(prev =>
      prev.map(unit =>
        unit.id === unitId ? { ...unit, status } : unit
      )
    );
  };

  const assignUnitToCall = (unitId: string, callId: string) => {
    setUnits(prev =>
      prev.map(unit =>
        unit.id === unitId
          ? { ...unit, currentCallId: callId, status: 'dispatched' as UnitStatus }
          : unit
      )
    );
    setCalls(prev =>
      prev.map(call =>
        call.id === callId
          ? { ...call, assignedUnits: [...call.assignedUnits, unitId] }
          : call
      )
    );
  };

  return {
    calls,
    units,
    lastUpdate,
    addNewCall,
    updateCallStatus,
    updateUnitStatus,
    assignUnitToCall,
  };
}