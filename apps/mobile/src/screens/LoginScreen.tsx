import React, { memo, useState, useCallback } from 'react';
import {
  View, Text, TextInput, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { LoginSchema } from '../lib/validation';
import type { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default memo(function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { signIn } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  const handleLogin = useCallback(async () => {
    setError(null);
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? 'Invalid input');
      return;
    }
    setLoading(true);
    try {
      await signIn(result.data.email, result.data.password);
    } catch {
      // Generic error — never reveal whether the email exists (OWASP A07)
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, signIn]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.logo}>DABBLE</Text>
            <Text style={styles.tagline}>Do things. With people.</Text>
          </View>

          <View style={styles.form}>
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8A8A9A"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#8A8A9A"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
              autoComplete="password"
            />

            <Button label="Sign In" onPress={handleLogin} loading={loading} style={{ marginTop: 8 }} />

            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.switchLink}>
              <Text style={styles.switchText}>
                New to Dabble?{' '}
                <Text style={styles.switchAccent}>Create account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#1A1A2E' },
  flex:         { flex: 1 },
  content:      { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header:       { alignItems: 'center', marginBottom: 48 },
  logo:         { fontSize: 48, fontWeight: '900', color: '#E8572A', letterSpacing: 6 },
  tagline:      { fontSize: 16, color: '#8A8A9A', marginTop: 8, letterSpacing: 0.5 },
  form:         { gap: 12 },
  input: {
    backgroundColor: '#2A2A3E',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3A3A5E',
  },
  errorBox:     { backgroundColor: '#C0392B', borderRadius: 10, padding: 12 },
  errorText:    { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  switchLink:   { alignItems: 'center', marginTop: 16 },
  switchText:   { color: '#8A8A9A', fontSize: 15 },
  switchAccent: { color: '#E8572A', fontWeight: '700' },
});
