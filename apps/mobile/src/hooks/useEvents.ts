import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { AsyncState, DabbleEvent } from '../types';

export function useEvents() {
  const [state, setState] = useState<AsyncState<DabbleEvent[]>>({ status: 'idle' });

  const fetchEvents = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('events')
        .select(`
          id, business_id, title, description, category,
          event_date, event_time, cover_image_url, capacity, created_at,
          business:businesses(id, name, address, borough, category),
          attendances(count)
        `)
        .eq('is_active', true)
        .gte('event_date', today)
        .order('event_date', { ascending: true })
        .order('event_time', { ascending: true })
        .limit(50);

      if (error) throw error;

      const events = (data ?? []).map(row => ({
        ...row,
        attendee_count: (row.attendances as unknown as { count: number }[])[0]?.count ?? 0,
      })) as DabbleEvent[];

      setState({ status: 'success', data: events });
    } catch (err) {
      setState({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load events',
      });
    }
  }, []);

  useEffect(() => {
    void fetchEvents();
  }, [fetchEvents]);

  return { state, refetch: fetchEvents };
}

export function useEventDetail(eventId: string) {
  const [state, setState] = useState<AsyncState<DabbleEvent>>({ status: 'idle' });

  useEffect(() => {
    if (!eventId) return;
    setState({ status: 'loading' });

    supabase
      .from('events')
      .select(`
        id, business_id, title, description, category,
        event_date, event_time, cover_image_url, capacity, created_at,
        business:businesses(id, name, address, borough, category, website, instagram),
        attendances(id, user_id, status, created_at, profile:profiles(id, full_name, avatar_url, neighborhood))
      `)
      .eq('id', eventId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setState({ status: 'error', error: error.message });
        } else if (data) {
          setState({ status: 'success', data: data as unknown as DabbleEvent });
        }
      });
  }, [eventId]);

  return state;
}
