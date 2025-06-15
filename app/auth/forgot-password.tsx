import { Colors } from '@/app/constants/Colors';
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

export default function ForgotPasswordScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!phoneNumber.trim()) {
      // In a real app, you'd show an error message
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset isLoading and go back to login screen
      setIsLoading(false);
      
      // In a real app, you'd show a success message before navigating
      router.back();
    } catch (error) {
      setIsLoading(false);
      console.error('Password reset failed:', error);
      // In a production app, you would show an error message here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>RESET PASSWORD</Text>
        <Text style={styles.headerSubtitle}>
          Enter your phone number to reset your password
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
        
        <Text style={styles.instructionText}>
          We'll send you a one-time code to reset your password.
        </Text>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resetButtonText}>
              Send Reset Code
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
    height: 180,
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
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 32,
    gap: 20,
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: '#057676',
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#057676',
    borderRadius: 5,
    width: 180,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.background,
    fontWeight: '500',
    fontSize: 14,
  },
});
