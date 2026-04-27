'use client';

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
}

export function Button({
  label,
  onPress,
  loading   = false,
  disabled  = false,
  variant   = 'primary',
  type      = 'button',
  className = '',
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary:   'bg-brand-orange text-white shadow-md hover:bg-orange-600',
    secondary: 'bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-orange-50',
    ghost:     'bg-transparent text-brand-navy hover:bg-black/5',
  } as const;

  return (
    <button
      type={type}
      onClick={onPress}
      disabled={isDisabled}
      className={`
        w-full h-13 rounded-xl flex items-center justify-center px-6
        text-base font-bold tracking-wide transition-all
        ${variantClasses[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}
        ${className}
      `}
    >
      {loading ? (
        <span
          className={`w-5 h-5 border-2 rounded-full animate-spin ${
            variant === 'primary'
              ? 'border-white border-t-transparent'
              : 'border-brand-orange border-t-transparent'
          }`}
        />
      ) : (
        label
      )}
    </button>
  );
}
