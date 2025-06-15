import Button from '@/app/components/Button';
import { Colors } from '@/app/constants/Colors';
import { useAuth } from '@/app/hooks/useAuth';
import { theme } from '@/app/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Please sign in to access your profile</Text>
        <Button 
          title="Sign In" 
          onPress={() => router.push('/auth/login')} 
          style={styles.button}
        />
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.profileImage} 
          />
        </View>
        <Text style={styles.name}>{user?.name || 'User Name'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="card-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="location-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Saved Addresses</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="globe-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Help Center</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Contact Us</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="shield-checkmark-outline" size={24} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>
      
      <Button 
        title="Log Out" 
        variant="outline" 
        onPress={handleLogout}
        style={styles.logoutButton}
      />
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
    backgroundColor: Colors.primary,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 3,
    borderColor: Colors.background,
  },
  profileImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  name: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.light,
    marginBottom: 4,
  },
  email: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.text.light,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemText: {
    flex: 1,
    fontSize: theme.typography.fontSizes.md,
    color: Colors.text.primary,
    marginLeft: theme.spacing.md,
  },
  logoutButton: {
    marginTop: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
  },
  versionText: {
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    color: Colors.text.secondary,
    fontSize: theme.typography.fontSizes.sm,
  },
  title: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.text.secondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  linkText: {
    color: Colors.primary,
    fontSize: theme.typography.fontSizes.md,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});
