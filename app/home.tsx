import { Routes } from '@/app/constants/Routes';
import { useAuth } from '@/app/hooks/useAuth';
import HomeScreen from '@/app/screens/HomeScreen';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href={Routes.auth.login as any} />;
  }
  
  return <HomeScreen />;
}
