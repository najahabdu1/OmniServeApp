import Card from '@/app/components/Card';
import { Colors } from '@/app/constants/Colors';
import { theme } from '@/app/styles/theme';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock bookings data
const bookings = [
  { 
    id: '1', 
    serviceName: 'Home Cleaning', 
    date: '2025-06-18T14:00:00',
    status: 'upcoming',
    price: '$49',
    address: '123 Main St, Anytown, USA',
  },
  { 
    id: '2', 
    serviceName: 'Grocery Delivery', 
    date: '2025-06-20T11:00:00',
    status: 'upcoming',
    price: '$10',
    address: '456 Oak Ave, Somewhere, USA',
  },
  { 
    id: '3', 
    serviceName: 'Phone Repair', 
    date: '2025-06-10T15:30:00',
    status: 'completed',
    price: '$39',
    address: '789 Pine Rd, Elsewhere, USA',
  },
  { 
    id: '4', 
    serviceName: 'Food Delivery', 
    date: '2025-06-05T19:45:00',
    status: 'completed',
    price: '$28',
    address: '123 Main St, Anytown, USA',
  },
];

export default function BookingsScreen() {
  // Format date to user-friendly string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Filter bookings by status
  const upcomingBookings = bookings.filter(booking => booking.status === 'upcoming');
  const completedBookings = bookings.filter(booking => booking.status === 'completed');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Upcoming ({upcomingBookings.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Past ({completedBookings.length})</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={upcomingBookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No upcoming bookings</Text>
        }
        renderItem={({ item }) => (
          <Card style={styles.card} variant="elevated">
            <View style={styles.cardHeader}>
              <Text style={styles.serviceName}>{item.serviceName}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date & Time:</Text>
                <Text style={styles.infoValue}>{formatDate(item.date)}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Address:</Text>
                <Text style={styles.infoValue}>{item.address}</Text>
              </View>
              
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    color: Colors.text.secondary,
    fontSize: theme.typography.fontSizes.md,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  list: {
    padding: theme.spacing.md,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: Colors.text.secondary,
    fontSize: theme.typography.fontSizes.md,
  },
  card: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: theme.spacing.sm,
  },
  serviceName: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  price: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  cardContent: {
    width: '100%',
  },
  infoRow: {
    marginBottom: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.text.primary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: theme.borderRadius.md,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.text.light,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.error,
  },
  cancelButtonText: {
    color: Colors.error,
  },
});
