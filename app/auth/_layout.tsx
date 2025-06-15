import { Colors } from '@/app/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';

// Layout for all authentication-related screens
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
      }}
    />
  );
}
