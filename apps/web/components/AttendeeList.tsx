import type { Attendance } from '@/types';

function AttendeeItem({ attendance }: { attendance: Attendance }) {
  const profile  = attendance.profile;
  const initials = profile?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?';

  return (
    <div className="flex items-center py-2.5 border-b border-[#EFEFEF] last:border-0">
      {profile?.avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.avatar_url}
          alt={profile.full_name}
          className="w-10 h-10 rounded-full mr-3 object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center mr-3 flex-shrink-0">
          <span className="text-brand-orange text-sm font-extrabold">{initials}</span>
        </div>
      )}

      <span className="flex-1 text-[15px] text-brand-navy font-semibold truncate">
        {profile?.full_name ?? 'Dabbler'}
      </span>

      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          attendance.status === 'going'
            ? 'bg-[#FFF0EB] text-brand-orange'
            : 'bg-gray-100 text-brand-gray'
        }`}
      >
        {attendance.status}
      </span>
    </div>
  );
}

export function AttendeeList({ attendees }: { attendees: Attendance[] }) {
  if (attendees.length === 0) {
    return (
      <div className="py-6 flex items-center justify-center">
        <p className="text-brand-gray text-[15px]">Be the first to go!</p>
      </div>
    );
  }

  return (
    <div>
      {attendees.map(attendance => (
        <AttendeeItem key={attendance.id} attendance={attendance} />
      ))}
    </div>
  );
}
