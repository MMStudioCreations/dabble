import type { ExperienceLevel } from '@/types';

const LEVEL_COLORS: Record<ExperienceLevel, { bg: string; text: string }> = {
  beginner:    { bg: '#E8F5E9', text: '#388E3C' },
  casual:      { bg: '#FFF3E0', text: '#F57C00' },
  experienced: { bg: '#E3F2FD', text: '#1565C0' },
};

interface IntentionBadgeProps {
  level: ExperienceLevel;
  message: string;
  userName: string;
}

export function IntentionBadge({ level, message, userName }: IntentionBadgeProps) {
  const colors = LEVEL_COLORS[level];

  return (
    <div className="bg-white rounded-xl p-3.5 mb-2.5">
      <span
        className="inline-block rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wide mb-1.5"
        style={{ backgroundColor: colors.bg, color: colors.text }}
      >
        {level}
      </span>
      <p className="text-sm font-bold text-brand-navy mb-1">{userName}</p>
      <p className="text-sm text-brand-dark leading-relaxed">{message}</p>
    </div>
  );
}
