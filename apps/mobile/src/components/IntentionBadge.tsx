import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ExperienceLevel } from '../types';

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

export const IntentionBadge = memo(function IntentionBadge({
  level,
  message,
  userName,
}: IntentionBadgeProps) {
  const colors = LEVEL_COLORS[level];

  return (
    <View style={styles.container}>
      <View style={[styles.levelBadge, { backgroundColor: colors.bg }]}>
        <Text style={[styles.levelText, { color: colors.text }]}>{level}</Text>
      </View>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container:  { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, marginBottom: 10 },
  levelBadge: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 6 },
  levelText:  { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  userName:   { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  message:    { fontSize: 14, color: '#3A3A4E', lineHeight: 20 },
});
