import { Routes } from '@/app/constants/Routes';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.container}>
        {/* Status bar design from Figma */}
        <View style={styles.statusBarContainer}>
          <View style={styles.statusBarContent}>
            <Text style={styles.statusBarTime}>9:41</Text>
            <View style={styles.statusBarRight}>
              <View style={styles.statusBarIcon}></View>
              <View style={styles.statusBarIcon}></View>
              <View style={styles.battery}>
                <View style={styles.batteryFill}></View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Background image with shadow effect */}
        <Image
          source={require('@/assets/images/welcome_background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        {/* Content container at bottom part of screen */}
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>WELCOME TO OMNISERVE</Text>
            <Text style={styles.subtitle}>
              Discover everything you need in one place{'\n'}
              products service and more.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Pressable 
              style={styles.getStartedButton}
              android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
              onPress={() => router.push(Routes.auth.login as any)}
            >
              <Text style={styles.buttonText}>Get started</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 70,
    left: 16,
    width: 361,
    height: 424,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 86,
    alignItems: 'flex-start',
  },
  textContainer: {
    width: '100%',
    marginBottom: 48,
    gap: 12,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(0,0,0,0.6)',
  },
  subtitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
    textAlign: 'left',
  },
  getStartedButton: {
    backgroundColor: '#057676',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: 205,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  statusBarContainer: {
    width: '100%',
    height: 50,
    paddingTop: 21,
  },
  statusBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statusBarTime: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 17,
    color: '#000000',
  },
  statusBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statusBarIcon: {
    width: 17,
    height: 12,
    backgroundColor: '#000000',
    opacity: 0.8,
  },
  battery: {
    width: 25,
    height: 13,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    padding: 2,
    marginLeft: 7,
  },
  batteryFill: {
    width: 21,
    height: 9,
    backgroundColor: '#0BFF69',
    borderRadius: 2.5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  }
});
