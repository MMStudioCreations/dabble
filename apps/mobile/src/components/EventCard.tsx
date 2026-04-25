import React, { memo, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform, Image,
} from 'react-native';
import { format } from 'date-fns';
import type { DabbleEvent } from '../types';

interface EventCardProps {
  event: DabbleEvent;
  onPress: (event: DabbleEvent) => void;
}

export const EventCard = memo(function EventCard({ event, onPress }: EventCardProps) {
  const handlePress = useCallback(() => onPress(event), [event, onPress]);

  const formattedDate = format(new Date(event.event_date), 'EEE, MMM d');
  const formattedTime = event.event_time.slice(0, 5);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.92}>
      {event.cover_image_url ? (
        <Image source={{ uri: event.cover_image_url }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.categoryLabel}>{event.category.replace('_', ' & ').toUpperCase()}</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.dateText}>{formattedDate} · {formattedTime}</Text>
          {(event.attendee_count ?? 0) > 0 && (
            <View style={styles.attendeeBadge}>
              <Text style={styles.attendeeText}>{event.attendee_count} going</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>

        {event.business && (
          <Text style={styles.businessName} numberOfLines={1}>{event.business.name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor:   '#1A1A2E',
        shadowOffset:  { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius:  12,
      },
      android: { elevation: 4 },
    }),
  },
  image:            { width: '100%', height: 160 },
  imagePlaceholder: { backgroundColor: '#1A1A2E', alignItems: 'center', justifyContent: 'center' },
  categoryLabel:    { color: '#E8572A', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  content:          { padding: 16 },
  metaRow:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  dateText:         { fontSize: 12, color: '#8A8A9A', fontWeight: '600', letterSpacing: 0.3 },
  attendeeBadge:    { backgroundColor: '#FFF0EB', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  attendeeText:     { fontSize: 12, color: '#E8572A', fontWeight: '700' },
  title:            { fontSize: 18, fontWeight: '800', color: '#1A1A2E', lineHeight: 24, marginBottom: 6 },
  businessName:     { fontSize: 13, color: '#8A8A9A', fontWeight: '500' },
});
