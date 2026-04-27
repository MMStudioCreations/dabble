'use client';

import { use, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useEventDetail } from '@/hooks/useEvents';
import { useAttendance } from '@/hooks/useAttendance';
import { useAuthContext } from '@/components/AuthProvider';
import { Button } from '@/components/Button';
import { AttendeeList } from '@/components/AttendeeList';
import type { Attendance, AttendanceStatus } from '@/types';

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }     = use(params);
  const { user }   = useAuthContext();
  const eventState = useEventDetail(id);
  const { toggleAttendance, loading: attendanceLoading } = useAttendance(user?.id);

  // Optimistic going state — avoids a full re-fetch after toggling
  const [isGoingOverride, setIsGoingOverride] = useState<boolean | null>(null);

  const handleAttend = useCallback(async () => {
    if (eventState.status !== 'success') return;
    const event   = eventState.data;
    const isGoing = isGoingOverride ?? (event.user_attendance === 'going');
    const current: AttendanceStatus | null = isGoing ? 'going' : null;
    await toggleAttendance(event.id, current);
    setIsGoingOverride(!isGoing);
  }, [eventState, isGoingOverride, toggleAttendance]);

  if (eventState.status === 'loading' || eventState.status === 'idle') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (eventState.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <p className="text-brand-orange mb-4">{eventState.error}</p>
        <Link href="/events" className="text-brand-navy font-semibold underline underline-offset-2">
          Back to events
        </Link>
      </div>
    );
  }

  const event       = eventState.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attendees   = ((event as any).attendances as Attendance[]) ?? [];
  const isGoing     = isGoingOverride ?? (event.user_attendance === 'going');
  const formattedDate = format(new Date(event.event_date), 'EEEE, MMMM d, yyyy');

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Back button */}
      <Link
        href="/events"
        className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur rounded-full p-2 shadow-sm"
        aria-label="Back to events"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </Link>

      {/* Cover */}
      {event.cover_image_url ? (
        <div className="relative w-full h-60">
          <Image
            src={event.cover_image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : (
        <div className="w-full h-60 bg-brand-navy flex items-center justify-center">
          <span className="text-brand-orange text-xs font-extrabold tracking-[3px]">
            {event.category.replace('_', ' & ').toUpperCase()}
          </span>
        </div>
      )}

      <div className="p-6 pb-12">
        <h1 className="text-[26px] font-black text-brand-navy leading-[32px] mb-1.5">
          {event.title}
        </h1>

        {event.business && (
          <p className="text-brand-orange font-bold text-base mb-2.5">{event.business.name}</p>
        )}

        <div className="flex items-center gap-1 mb-1">
          <span className="text-sm text-brand-gray font-semibold">{formattedDate}</span>
          <span className="text-brand-gray"> · </span>
          <span className="text-sm text-brand-gray font-semibold">{event.event_time.slice(0, 5)}</span>
        </div>

        {event.business?.address && (
          <p className="text-sm text-brand-gray mt-1 mb-4">{event.business.address}</p>
        )}

        {event.description && (
          <p className="text-base text-brand-dark leading-relaxed mt-4 pt-4 border-t border-[#DEDEDE]">
            {event.description}
          </p>
        )}

        <div className="mt-6">
          <Button
            label={isGoing ? "You're Going ✓" : "I'm Going"}
            onPress={handleAttend}
            loading={attendanceLoading}
            variant={isGoing ? 'secondary' : 'primary'}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-[18px] font-extrabold text-brand-navy mb-3">
            Who&apos;s Going ({attendees.length})
          </h2>
          <AttendeeList attendees={attendees} />
        </div>
      </div>
    </div>
  );
}
