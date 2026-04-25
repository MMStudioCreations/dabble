import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import HomeScreen from '../screens/HomeScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import type { RootStackParamList, MainTabParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab   = createBottomTabNavigator<MainTabParamList>();

const BRAND = {
  primary: '#E8572A',
  dark:    '#1A1A2E',
  surface: '#F5F0EC',
  muted:   '#8A8A9A',
} as const;

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:   BRAND.primary,
        tabBarInactiveTintColor: BRAND.muted,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor:  '#EFEFEF',
          height: 60,
          paddingBottom: 8,
        },
        headerStyle:      { backgroundColor: BRAND.dark },
        headerTintColor:  '#FFFFFF',
        headerTitleStyle: { fontWeight: '700', letterSpacing: 1 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'DABBLE', tabBarLabel: 'Events' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile', tabBarLabel: 'Me' }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"  component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export const RootNavigator = memo(function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs"    component={MainTabs} />
          <Stack.Screen
            name="EventDetail"
            component={EventDetailScreen}
            options={{
              headerShown: true,
              title: '',
              headerStyle:     { backgroundColor: BRAND.dark },
              headerTintColor: '#FFFFFF',
            }}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
});
