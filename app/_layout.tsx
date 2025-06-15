import ErrorBoundary from '@/app/components/ErrorBoundary';
import { Colors } from '@/app/constants/Colors';
import { AuthProvider } from '@/app/hooks/useAuth';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Hide splash screen once fonts are loaded
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Don't render until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'fade_from_bottom',
            animationDuration: 200,
            presentation: 'card',
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Welcome',
              animation: 'simple_push',
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              title: 'Home',
              animation: 'slide_from_right',
            }}
          />
          {/* Add more screens with custom options as needed */}
        </Stack>
      </AuthProvider>
    </ErrorBoundary>
  );
}
