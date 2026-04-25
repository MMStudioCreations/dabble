import React, { memo, useCallback } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import type { Attendance } from '../types';

const AttendeeItem = memo(function AttendeeItem({ attendance }: { attendance: Attendance }) {
  const profile  = attendance.profile;
  const initials = profile?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?';

  return (
    <View style={styles.item}>
      {profile?.avatar_url ? (
        <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      )}
      <Text style={styles.name} numberOfLines={1}>{profile?.full_name ?? 'Dabbler'}</Text>
      <View style={[styles.statusBadge, attendance.status === 'going' && styles.goingBadge]}>
        <Text style={styles.statusText}>{attendance.status}</Text>
      </View>
    </View>
  );
});

export const AttendeeList = memo(function AttendeeList({ attendees }: { attendees: Attendance[] }) {
  const keyExtractor = useCallback((item: Attendance) => item.id, []);
  const renderItem   = useCallback(
    ({ item }: { item: Attendance }) => <AttendeeItem attendance={item} />,
    []
  );

  if (attendees.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Be the first to go!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={attendees}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      scrollEnabled={false}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
});

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFEF',
  },
  avatar:            { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  avatarPlaceholder: { backgroundColor: '#1A1A2E', alignItems: 'center', justifyContent: 'center' },
  initials:          { color: '#E8572A', fontSize: 14, fontWeight: '800' },
  name:              { flex: 1, fontSize: 15, color: '#1A1A2E', fontWeight: '600' },
  statusBadge:       { backgroundColor: '#F0F0F5', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  goingBadge:        { backgroundColor: '#FFF0EB' },
  statusText:        { fontSize: 12, color: '#8A8A9A', fontWeight: '600' },
  empty:             { padding: 24, alignItems: 'center' },
  emptyText:         { fontSize: 15, color: '#8A8A9A' },
});
