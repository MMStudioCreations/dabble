import React, { memo } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
}

export const Button = memo(function Button({
  label,
  onPress,
  loading  = false,
  disabled = false,
  variant  = 'primary',
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.base, styles[variant], isDisabled && styles.disabled, style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFF' : '#E8572A'} />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label` as const]]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    ...Platform.select({
      ios: {
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius:  4,
      },
      android: { elevation: 3 },
    }),
  },
  primary:   { backgroundColor: '#E8572A' },
  secondary: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#E8572A' },
  ghost:     { backgroundColor: 'transparent' },
  disabled:  { opacity: 0.5 },
  label:     { fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  primaryLabel:   { color: '#FFFFFF' },
  secondaryLabel: { color: '#E8572A' },
  ghostLabel:     { color: '#1A1A2E' },
});
