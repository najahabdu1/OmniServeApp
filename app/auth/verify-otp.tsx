import { Colors } from '@/app/constants/Colors';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
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
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

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
  
  const handleResendOtp = () => {
    if (resendDisabled) return;
    
    // Disable resend button and start countdown
    setResendDisabled(true);
    setCountdown(30);
    
    // Simulate sending new OTP
    // In a real app, you would make an API call here
    
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
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
      <StatusBar barStyle="light-content" backgroundColor="#057676" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image 
            source={require('@/assets/images/otp-arrow-left.svg')} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>LOGIN</Text>
        <Text style={styles.headerSubtitle}>
          Enter the OTP we sent to your mobile number
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
              style={[
                styles.otpInput,
                index === 0 && styles.otpInputWithBorder,
                otp[index] ? styles.otpInputFilled : {}
              ]}
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
        
        <TouchableOpacity 
          style={[styles.resendContainer, resendDisabled && styles.resendContainerDisabled]} 
          onPress={handleResendOtp}
          disabled={resendDisabled}
        >
          <Text style={styles.resendText}>
            {resendDisabled 
              ? `Resend code in ${countdown}s` 
              : "Resend code via sms"}
          </Text>
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
              Proceed
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
  backIcon: {
    width: 7,
    height: 14,
  },
  headerTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    fontFamily: 'Sansita-Bold',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 50,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 68,
    marginBottom: 40,
  },
  otpInput: {
    width: 62,
    height: 69,
    backgroundColor: '#E7EAEF',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  otpInputWithBorder: {
    borderWidth: 0.7,
    borderColor: '#000000',
    backgroundColor: Colors.background,
  },
  otpInputFilled: {
    backgroundColor: '#E7EAEF',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#E7EAEF',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  resendContainerDisabled: {
    opacity: 0.7,
  },
  resendText: {
    color: 'rgba(89, 89, 89, 0.8)',
    fontWeight: '500',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 32,
    marginTop: 'auto',
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
    fontFamily: 'Poppins-Medium',
  },
});
