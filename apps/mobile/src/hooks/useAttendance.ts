import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { AttendanceStatus, EventId, UserId } from '../types';
import { AttendanceStatus as AS } from '../types';

export function useAttendance(userId: UserId | undefined) {
  const [loading, setLoading] = useState(false);

  const toggleAttendance = useCallback(
    async (eventId: EventId, currentStatus: AttendanceStatus | null) => {
      if (!userId) return;
      setLoading(true);

      try {
        if (currentStatus) {
          await supabase
            .from('attendances')
            .delete()
            .eq('user_id', userId)
            .eq('event_id', eventId);
        } else {
          await supabase.from('attendances').upsert({
            user_id: userId,
            event_id: eventId,
            status: AS.GOING,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  return { toggleAttendance, loading };
}
