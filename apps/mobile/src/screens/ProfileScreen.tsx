import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

export default memo(function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    try { await signOut(); } catch { /* no-op */ }
  }, [signOut]);

  const initials = user?.profile?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>

        <Text style={styles.name}>{user?.profile?.full_name ?? 'Dabbler'}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {user?.profile?.neighborhood && (
          <Text style={styles.neighborhood}>{user.profile.neighborhood}, Staten Island</Text>
        )}

        {user?.profile?.bio && (
          <Text style={styles.bio}>{user.profile.bio}</Text>
        )}

        <Button label="Sign Out" onPress={handleSignOut} variant="ghost" style={{ marginTop: 32 }} />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#F5F0EC' },
  content:      { flex: 1, alignItems: 'center', padding: 32 },
  avatar: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: '#1A1A2E',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  initials:     { color: '#E8572A', fontSize: 32, fontWeight: '900' },
  name:         { fontSize: 24, fontWeight: '800', color: '#1A1A2E', marginBottom: 4 },
  email:        { fontSize: 14, color: '#8A8A9A', marginBottom: 8 },
  neighborhood: { fontSize: 14, color: '#E8572A', fontWeight: '600', marginBottom: 16 },
  bio:          { fontSize: 15, color: '#3A3A4E', textAlign: 'center', lineHeight: 22 },
});
