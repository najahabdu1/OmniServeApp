import { Colors } from '@/app/constants/Colors';
import { theme } from '@/app/styles/theme';
import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

/**
 * Button component that follows the app's design system
 * 
 * @param title - Button text
 * @param variant - Visual style variant ('primary', 'secondary', or 'outline')
 * @param size - Size of the button ('small', 'medium', or 'large')
 * @param isLoading - Whether to show loading indicator
 */
const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  style,
  disabled,
  isLoading = false,
  ...rest
}) => {
  // Combine styles based on props
  const getButtonStyle = (): StyleProp<ViewStyle> => {
    const baseStyles = [
      styles.button,
      styles[variant as keyof typeof styles],
      styles[size as keyof typeof styles],
    ];
    
    if (disabled) {
      baseStyles.push(styles.disabled);
    }
    
    return [baseStyles, style];
  };
  
  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyles = [styles.buttonText];
    
    if (variant === 'outline') {
      baseStyles.push(styles.outlineText);
    }
    
    if (disabled) {
      baseStyles.push({ opacity: 0.6 });
    }
    
    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      disabled={disabled || isLoading}
      accessible
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isLoading }}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? Colors.primary : Colors.text.light} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  medium: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    width: '80%',
  },
  large: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    width: '90%',
  },
  buttonText: {
    color: Colors.text.light,
    fontWeight: theme.typography.fontWeights.medium,
    fontSize: theme.typography.fontSizes.md,
  },
  outlineText: {
    color: Colors.primary,
  },
});

export default Button;
