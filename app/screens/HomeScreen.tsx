import Button from '@/app/components/Button';
import Card from '@/app/components/Card';
import { Colors } from '@/app/constants/Colors';
import { theme } from '@/app/styles/theme';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Mock data for service categories
const serviceCategories = [
  { id: '1', name: 'Cleaning' },
  { id: '2', name: 'Delivery' },
  { id: '3', name: 'Repairs' },
  { id: '4', name: 'Food' },
  { id: '5', name: 'Healthcare' },
];

// Mock featured services
const featuredServices = [
  { id: '1', title: 'House Cleaning', price: '$49', rating: 4.8 },
  { id: '2', title: 'Grocery Delivery', price: '$10', rating: 4.7 },
  { id: '3', title: 'Phone Repair', price: '$39', rating: 4.5 },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate data fetching
  const fetchData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.background}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>OmniServe</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationBadge}>3</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        ) : (
          <>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.subheading}>What service do you need today?</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {serviceCategories.map((category) => (
                <TouchableOpacity 
                  key={category.id} 
                  style={styles.categoryButton}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Text style={styles.sectionTitle}>Featured Services</Text>
            {featuredServices.map((service) => (
              <Card 
                key={service.id} 
                style={styles.serviceCard}
                variant="elevated"
                fullWidth
              >
                <View style={styles.serviceCardContent}>
                  <View>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceRating}>★ {service.rating}</Text>
                  </View>
                  <View>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                    <Button 
                      title="Book" 
                      size="small" 
                      style={styles.bookButton}
                    />
                  </View>
                </View>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: Colors.primary,
    color: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  loader: {
    marginTop: 50,
  },
  welcomeSection: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  welcomeText: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  subheading: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: '600',
    marginVertical: theme.spacing.md,
    color: Colors.text.primary,
  },
  categoriesContainer: {
    paddingVertical: theme.spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  categoryText: {
    color: Colors.text.light,
    fontSize: theme.typography.fontSizes.md,
  },
  serviceCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    width: '100%',
  },
  serviceCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  serviceTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  serviceRating: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#FFB800',
  },
  servicePrice: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'right',
    marginBottom: 8,
  },
  bookButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: 80,
  },
});
