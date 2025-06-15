/**
 * Core application models and interfaces
 * Use these types throughout the application for consistent type checking
 */

/**
 * User model
 */
export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Service category model
 */
export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

/**
 * Service provider model
 */
export interface ServiceProvider {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  services: Service[];
}

/**
 * Service model
 */
export interface Service {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  duration: number; // in minutes
  categoryId: string;
  providerId: string;
  imageUrl?: string;
  rating?: number;
}

/**
 * Booking status enumeration
 */
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

/**
 * Booking model
 */
export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  providerId: string;
  status: BookingStatus;
  date: Date;
  duration: number; // in minutes
  price: number;
  currency: string;
  address?: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Address model
 */
export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isPrimary?: boolean;
}

/**
 * Payment model
 */
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'cash';
  createdAt: Date;
}

/**
 * Notification model
 */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'promotion' | 'system' | 'payment';
  read: boolean;
  data?: Record<string, any>;
  createdAt: Date;
}

/**
 * Review model
 */
export interface Review {
  id: string;
  userId: string;
  serviceId: string;
  providerId: string;
  bookingId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
