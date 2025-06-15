import { Colors } from '@/app/constants/Colors';
import { useAuth } from '@/app/hooks/useAuth';
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
    View
} from 'react-native';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, isLoading } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      // For demo, we'll use the phone number as the email
      await login(`${phoneNumber}@example.com`, password);
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Login failed:', error);
      // In a production app, you would show an error message here
    }
  };

  const switchToOtp = () => {
    // Navigate to the OTP login screen
    router.push('/auth/otp-login');
  };

  const switchToPassword = () => {
    setLoginMethod('password');
  };

  const handleCreateAccount = () => {
    router.push('/auth/register');
  };

  // OTP handling is now done in the separate OTP login screen

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>LOGIN</Text>
        <Text style={styles.headerSubtitle}>
          Enter your Phone number and password
        </Text>
      </View>

      {/* Form */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        {/* Phone number input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            placeholderTextColor="rgba(0, 0, 0, 0.45)"
            keyboardType="phone-pad"
          />
        </View>

        {loginMethod === 'password' ? (
          <>
            {/* Password input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.45)"
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={togglePasswordVisibility}
              >
                <Ionicons 
                  name={isPasswordVisible ? "eye-off" : "eye"} 
                  size={18} 
                  color="black" 
                />
              </TouchableOpacity>
            </View>

            {/* Forgot password */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password</Text>
            </TouchableOpacity>
          </>
        ) : null}

        {/* OTP switch */}
        <View style={styles.otpContainer}>
          <View style={styles.otpLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.otpLine} />
        </View>

        {/* OTP toggle button */}
        <View style={styles.otpToggleContainer}>
          <View style={styles.otpToggleBorder}>
            {loginMethod === 'password' ? (
              <>
                <Text style={styles.useOtpText}>USE OTP INSTEAD</Text>
                <TouchableOpacity
                  style={styles.sendOtpButton}
                  onPress={switchToOtp}
                >
                  <Text style={styles.sendOtpText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.usePasswordButton}
                onPress={switchToPassword}
              >
                <Text style={styles.usePasswordText}>USE PASSWORD INSTEAD</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        {/* Create account text */}
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>
            Don't have an account <Text style={styles.createAccountBold}>CREATE ONE</Text>
          </Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>
              Continue
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
    paddingTop: 75,
    paddingHorizontal: 28,
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
    justifyContent: 'center',
    paddingHorizontal: 15,
    position: 'relative',
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#057676',
    fontSize: 11,
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  otpLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  orText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  otpToggleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  otpToggleBorder: {
    borderWidth: 1,
    borderColor: '#057676',
    borderRadius: 3,
    width: 170,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  useOtpText: {
    fontSize: 9.8,
    fontWeight: '500',
    letterSpacing: 1,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  sendOtpButton: {
    marginTop: -2,
  },
  sendOtpText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#000',
  },
  usePasswordButton: {
    padding: 5,
  },
  usePasswordText: {
    fontSize: 9.8,
    fontWeight: '500',
    letterSpacing: 1,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  createAccountText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.8)',
    marginBottom: 16,
  },
  createAccountBold: {
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#057676',
    borderRadius: 5,
    width: 180,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: Colors.background,
    fontWeight: '500',
    fontSize: 14,
  },
});
