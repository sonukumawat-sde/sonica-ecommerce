// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: Category;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  tags: string[];
  specifications: Record<string, string>;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Wishlist Types
export interface Wishlist {
  items: Product[];
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export type PaymentStatus = 
  | 'pending' 
  | 'completed' 
  | 'failed' 
  | 'refunded';

// Review Types
export interface Review {
  id: string;
  productId: string;
  user: User;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: User;
  tags: string[];
  readTime: number;
  createdAt: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Search Types
export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  value: string;
  image?: string;
}

// Filter Types
export interface ProductFilters {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  ratings: number[];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
}

// Notification Types
export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Admin Types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: Order[];
  salesChart: ChartData[];
}

export interface ChartData {
  label: string;
  value: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
