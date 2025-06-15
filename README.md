# OmniServeApp

A comprehensive mobile application for booking and managing services, built with React Native and Expo.

## Features

- **Service Discovery**: Browse and search for various services
- **Booking Management**: Schedule, track, and manage service appointments
- **User Profiles**: Manage personal information and preferences
- **Notifications**: Receive alerts for bookings and promotions

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/OmniServeApp.git
   cd OmniServeApp
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run on your preferred platform
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your physical device

## Project Structure

```
app/
├── (tabs)/          # Tab-based navigation
├── components/      # Reusable UI components
├── constants/       # App constants (colors, routes)
├── hooks/           # Custom React hooks
├── screens/         # Screen components
├── services/        # API services
├── styles/          # Global styles and theming
├── types/           # TypeScript declarations
└── utils/           # Utility functions
```

## Best Practices

### Code Organization
- **Component Structure**: Use atomic design principles (atoms, molecules, organisms)
- **State Management**: Keep complex state in hooks and context
- **File Naming**: Use PascalCase for components, camelCase for others

### Performance Optimization
- Use React.memo for pure components
- Implement useCallback for functions passed as props
- Apply useMemo for expensive calculations
- Optimize image assets and lazy loading

### Styling
- Use StyleSheet.create for all styles
- Follow the established theme structure
- Apply consistent spacing using the theme variables
- Ensure responsive layouts for different screen sizes

### Accessibility
- Add proper accessibilityLabel and accessibilityHint
- Implement proper focus management
- Use appropriate accessibilityRole values
- Test with screen readers

### Error Handling
- Implement error boundaries
- Use try/catch blocks for async operations
- Provide meaningful error messages
- Log errors for debugging

## Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Start the app on Android
- `npm run ios`: Start the app on iOS
- `npm run web`: Start the app in web browser
- `npm run lint`: Run ESLint

## Testing

- **Unit Tests**: Test individual components and functions
  ```bash
  npm run test
  ```

- **End-to-End Tests**: Test the full application flow
  ```bash
  npm run e2e
  ```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
