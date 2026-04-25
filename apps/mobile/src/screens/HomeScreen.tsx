import React, { memo, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/EventCard';
import type { DabbleEvent, RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default memo(function HomeScreen() {
  const navigation         = useNavigation<Nav>();
  const { state, refetch } = useEvents();

  const handleEventPress = useCallback(
    (event: DabbleEvent) => navigation.navigate('EventDetail', { eventId: event.id }),
    [navigation]
  );

  const keyExtractor = useCallback((item: DabbleEvent) => item.id, []);
  const renderItem   = useCallback(
    ({ item }: { item: DabbleEvent }) => <EventCard event={item} onPress={handleEventPress} />,
    [handleEventPress]
  );

  const ListHeader = useCallback(() => (
    <View style={styles.header}>
      <Text style={styles.sectionTitle}>Happening on Staten Island</Text>
    </View>
  ), []);

  if (state.status === 'loading') {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#E8572A" />
      </SafeAreaView>
    );
  }

  if (state.status === 'error') {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{state.error}</Text>
      </SafeAreaView>
    );
  }

  const events = state.status === 'success' ? state.data : [];

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={events}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.list}
        removeClippedSubviews
        maxToRenderPerBatch={8}
        windowSize={5}
        refreshControl={
          <RefreshControl
            refreshing={state.status === 'loading'}
            onRefresh={refetch}
            tintColor="#E8572A"
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No upcoming events yet.</Text>
            <Text style={styles.emptySubtitle}>Check back soon — more are coming.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#F5F0EC' },
  centered:      { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F0EC' },
  list:          { paddingTop: 8, paddingBottom: 32 },
  header:        { paddingHorizontal: 16, paddingVertical: 16 },
  sectionTitle:  { fontSize: 22, fontWeight: '900', color: '#1A1A2E', letterSpacing: -0.5 },
  errorText:     { color: '#E8572A', fontSize: 16 },
  empty:         { padding: 48, alignItems: 'center' },
  emptyTitle:    { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#8A8A9A' },
});
