import { Colors } from '@/app/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
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

export default function VerifyOtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef<Array<TextInput | null>>([null, null, null, null]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const focusNext = (index: number, value: string) => {
    if (value && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const focusPrevious = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      // In a real app, you'd show an error message
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset loading state
      setIsLoading(false);
      
      // Navigate to home screen on success
      router.replace('/home');
    } catch (error) {
      setIsLoading(false);
      console.error('OTP verification failed:', error);
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
        
        <Text style={styles.headerTitle}>VERIFY OTP</Text>
        <Text style={styles.headerSubtitle}>
          Enter the OTP sent to your mobile number
        </Text>
      </View>

      {/* Form */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        {/* OTP input */}
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(input) => {
                otpInputs.current[index] = input;
              }}
              style={styles.otpInput}
              value={otp[index]}
              onChangeText={(value) => focusNext(index, value)}
              onKeyPress={({ nativeEvent }) => {
                focusPrevious(index, nativeEvent.key);
              }}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        
        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.verifyButton} 
          onPress={handleVerifyOtp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>
              Verify
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E7EAEF',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#057676',
    fontWeight: '500',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  verifyButton: {
    backgroundColor: '#057676',
    borderRadius: 5,
    width: 180,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: Colors.background,
    fontWeight: '500',
    fontSize: 14,
  },
});
