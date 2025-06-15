import { Colors } from '@/app/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function OtpLoginScreen() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleGetOtp = async () => {
    if (mobileNumber.length !== 10) {
      // In a real app, you'd show an error message
      console.log('Please enter a valid 10 digit mobile number');
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API call to send an OTP
      console.log('Sending OTP to:', mobileNumber);
      
      // Reset loading state
      setIsLoading(false);
      
      // Navigate to OTP verification screen
      router.push('/auth/verify-otp');
    } catch (error) {
      setIsLoading(false);
      console.error('Failed to send OTP:', error);
      // In a production app, you would show an error message here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>LOGIN</Text>
        <Text style={styles.headerSubtitle}>
          Enter your mobile number to get OTP
        </Text>
      </View>

      {/* Form */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        {/* Phone number input */}
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <View style={styles.separator} />
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
            placeholder="10 Digit Mobile number"
            placeholderTextColor="rgba(0, 0, 0, 0.45)"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.otpButton} 
          onPress={handleGetOtp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.otpButtonText}>
              Get OTP
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    backgroundColor: '#057676', // Teal color from Figma
    height: 205,
    paddingTop: 50,
    paddingHorizontal: 28,
  },
  backButton: {
    marginBottom: 20,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerSubtitle: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 50,
  },
  inputContainer: {
    backgroundColor: '#E7EAEF',
    borderRadius: 3,
    height: 48,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  countryCode: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
  separator: {
    width: 0.5,
    height: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    color: '#000',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  otpButton: {
    backgroundColor: '#057676',
    borderRadius: 5,
    width: 180,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpButtonText: {
    color: Colors.background,
    fontWeight: '500',
    fontSize: 14,
  },
});
