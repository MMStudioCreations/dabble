import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { DabbleEvent } from '@/types';

interface EventCardProps {
  event: DabbleEvent;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = format(new Date(event.event_date), 'EEE, MMM d');
  const formattedTime = event.event_time.slice(0, 5);

  return (
    <Link
      href={`/events/${event.id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(26,26,46,0.08)] hover:shadow-lg transition-shadow"
    >
      {event.cover_image_url ? (
        <div className="relative w-full h-40">
          <Image
            src={event.cover_image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
      ) : (
        <div className="w-full h-40 bg-brand-navy flex items-center justify-center">
          <span className="text-brand-orange text-[11px] font-extrabold tracking-[2px]">
            {event.category.replace('_', ' & ').toUpperCase()}
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-brand-gray font-semibold tracking-[0.3px]">
            {formattedDate} · {formattedTime}
          </span>
          {(event.attendee_count ?? 0) > 0 && (
            <span className="bg-[#FFF0EB] text-brand-orange text-xs font-bold px-2.5 py-1 rounded-full">
              {event.attendee_count} going
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-brand-navy leading-snug mb-1.5 line-clamp-2">
          {event.title}
        </h3>

        {event.business && (
          <p className="text-sm text-brand-gray font-medium truncate">
            {event.business.name}
          </p>
        )}
      </div>
    </Link>
  );
}
