import Card from '@/app/components/Card';
import { Colors } from '@/app/constants/Colors';
import { theme } from '@/app/styles/theme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Mock service data
const services = [
  { id: '1', name: 'Home Cleaning', category: 'Cleaning', price: '$49', rating: 4.8 },
  { id: '2', name: 'Office Cleaning', category: 'Cleaning', price: '$120', rating: 4.5 },
  { id: '3', name: 'Grocery Delivery', category: 'Delivery', price: '$10', rating: 4.7 },
  { id: '4', name: 'Food Delivery', category: 'Delivery', price: '$5', rating: 4.6 },
  { id: '5', name: 'Phone Repair', category: 'Repairs', price: '$39', rating: 4.5 },
  { id: '6', name: 'Plumbing', category: 'Repairs', price: '$75', rating: 4.9 },
];

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Services</Text>
      </View>
      
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card} variant="elevated">
            <View style={styles.cardContent}>
              <View style={styles.serviceDetails}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.serviceCategory}>{item.category}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>★ {item.rating}</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text.light,
  },
  list: {
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#FFB800',
  },
  priceContainer: {
    justifyContent: 'center',
  },
  price: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
