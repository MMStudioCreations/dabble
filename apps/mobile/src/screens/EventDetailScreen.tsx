import React, { memo, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  ActivityIndicator, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { useEventDetail } from '../hooks/useEvents';
import { useAttendance } from '../hooks/useAttendance';
import { useAuth } from '../hooks/useAuth';
import { AttendeeList } from '../components/AttendeeList';
import { Button } from '../components/Button';
import type { Attendance, EventId, RootStackParamList } from '../types';

type EventDetailRoute = RouteProp<RootStackParamList, 'EventDetail'>;

export default memo(function EventDetailScreen() {
  const route      = useRoute<EventDetailRoute>();
  const { eventId } = route.params;
  const { user }   = useAuth();
  const eventState = useEventDetail(eventId as string);
  const { toggleAttendance, loading: attendanceLoading } = useAttendance(user?.id);

  const handleAttend = useCallback(async () => {
    if (eventState.status !== 'success') return;
    await toggleAttendance(eventId, eventState.data.user_attendance ?? null);
  }, [eventState, eventId, toggleAttendance]);

  if (eventState.status === 'loading') {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#E8572A" />
      </SafeAreaView>
    );
  }

  if (eventState.status !== 'success') return null;

  const event     = eventState.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attendees = ((event as any).attendances as Attendance[]) ?? [];
  const isGoing   = event.user_attendance === 'going';
  const formattedDate = format(new Date(event.event_date), 'EEEE, MMMM d, yyyy');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {event.cover_image_url ? (
          <Image source={{ uri: event.cover_image_url }} style={styles.cover} resizeMode="cover" />
        ) : (
          <View style={[styles.cover, styles.coverPlaceholder]}>
            <Text style={styles.coverCategory}>
              {event.category.replace('_', ' & ').toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.body}>
          <Text style={styles.title}>{event.title}</Text>

          {event.business && (
            <Text style={styles.businessName}>{event.business.name}</Text>
          )}

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{formattedDate}</Text>
            <Text style={styles.metaDot}> · </Text>
            <Text style={styles.metaText}>{event.event_time.slice(0, 5)}</Text>
          </View>

          {event.business?.address && (
            <Text style={styles.address}>{event.business.address}</Text>
          )}

          {event.description && (
            <Text style={styles.description}>{event.description}</Text>
          )}

          <Button
            label={isGoing ? "You're Going ✓" : "I'm Going"}
            onPress={handleAttend}
            loading={attendanceLoading}
            variant={isGoing ? 'secondary' : 'primary'}
            style={{ marginTop: 24 }}
          />

          <View style={styles.attendeesSection}>
            <Text style={styles.attendeesTitle}>Who's Going ({attendees.length})</Text>
            <AttendeeList attendees={attendees} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: '#F5F0EC' },
  centered:         { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content:          { paddingBottom: 48 },
  cover:            { width: '100%', height: 240 },
  coverPlaceholder: { backgroundColor: '#1A1A2E', alignItems: 'center', justifyContent: 'center' },
  coverCategory:    { color: '#E8572A', fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  body:             { padding: 24 },
  title:            { fontSize: 26, fontWeight: '900', color: '#1A1A2E', lineHeight: 32, marginBottom: 6 },
  businessName:     { fontSize: 16, color: '#E8572A', fontWeight: '700', marginBottom: 10 },
  metaRow:          { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  metaText:         { fontSize: 14, color: '#8A8A9A', fontWeight: '600' },
  metaDot:          { color: '#8A8A9A' },
  address:          { fontSize: 14, color: '#8A8A9A', marginTop: 4, marginBottom: 16 },
  description: {
    fontSize: 16, color: '#3A3A4E', lineHeight: 24,
    marginTop: 16, paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#DEDEDE',
  },
  attendeesSection: { marginTop: 32 },
  attendeesTitle:   { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginBottom: 12 },
});
