'use client';

import { useEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/EventCard';

export default function EventsPage() {
  const { state, refetch } = useEvents();

  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <p className="text-brand-orange text-base mb-4">{state.error}</p>
        <button
          onClick={refetch}
          className="text-brand-navy font-semibold underline underline-offset-2"
        >
          Try again
        </button>
      </div>
    );
  }

  const events = state.data;

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="sticky top-0 bg-brand-cream/90 backdrop-blur px-4 pt-12 pb-4 z-10">
        <h1 className="text-[22px] font-black text-brand-navy tracking-tight">
          Happening on Staten Island
        </h1>
      </div>

      <div className="px-4 pb-4">
        {events.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-[18px] font-bold text-brand-navy mb-2">No upcoming events yet.</p>
            <p className="text-brand-gray text-sm">Check back soon — more are coming.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
