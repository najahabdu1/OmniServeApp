import { Colors } from '@/app/constants/Colors';
import { theme } from '@/app/styles/theme';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
  /** Content to be rendered inside the card */
  children: React.ReactNode;
  /** Optional style overrides */
  style?: ViewStyle;
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined';
  /** Whether the card should take the full width of its container */
  fullWidth?: boolean;
  /** Optional test ID for testing */
  testID?: string;
}

/**
 * Card component for containing content with consistent styling
 */
const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  variant = 'default',
  fullWidth = false,
  testID,
}) => {
  return (
    <View 
      style={[
        styles.card, 
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && styles.outlined,
        fullWidth && styles.fullWidth,
        style
      ]}
      testID={testID}
      accessibilityRole="none"
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    width: 340,
    alignItems: 'center',
  },
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      default: {
        // Web shadow styles
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      }
    }),
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Card;
