import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Product, 
  CartItem, 
  Wishlist, 
  Order, 
  Notification,
  Address 
} from '@/types';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
          addresses: [],
          role: 'user',
          createdAt: new Date().toISOString(),
        };
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          name,
          email,
          addresses: [],
          role: 'user',
          createdAt: new Date().toISOString(),
        };
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },

      addAddress: (address) => {
        const { user } = get();
        if (user) {
          const newAddress: Address = {
            ...address,
            id: Math.random().toString(36).substr(2, 9),
          };
          set({ 
            user: { 
              ...user, 
              addresses: [...user.addresses, newAddress] 
            } 
          });
        }
      },

      removeAddress: (id) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { 
              ...user, 
              addresses: user.addresses.filter(a => a.id !== id) 
            } 
          });
        }
      },

      setDefaultAddress: (id) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { 
              ...user, 
              addresses: user.addresses.map(a => ({
                ...a,
                isDefault: a.id === id
              }))
            } 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Cart Store
interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, options = {}) => {
        const { items } = get();
        const existingItem = items.find(
          item => item.product.id === product.id && 
          item.selectedColor === options.color && 
          item.selectedSize === options.size
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item === existingItem
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                product,
                quantity,
                selectedColor: options.color,
                selectedSize: options.size,
              },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Wishlist Store
interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        if (!items.find(item => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },

      toggleItem: (product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

// UI Store
interface UIState {
  isDarkMode: boolean;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  notifications: Notification[];
  toggleDarkMode: () => void;
  setSearchOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      isSearchOpen: false,
      isCartOpen: false,
      isMobileMenuOpen: false,
      notifications: [],

      toggleDarkMode: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };
        set({ notifications: [newNotification, ...get().notifications] });
      },

      removeNotification: (id) => {
        set({ notifications: get().notifications.filter(n => n.id !== id) });
      },

      markNotificationRead: (id) => {
        set({
          notifications: get().notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
        });
      },
    }),
    {
      name: 'ui-storage',
    }
  )
);

// Product Filter Store
interface FilterState {
  filters: {
    categories: string[];
    priceRange: [number, number];
    brands: string[];
    ratings: number[];
    sortBy: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
  };
  setCategoryFilter: (categories: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setBrandFilter: (brands: string[]) => void;
  setRatingFilter: (ratings: number[]) => void;
  setSortBy: (sort: FilterState['filters']['sortBy']) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  filters: {
    categories: [],
    priceRange: [0, 10000],
    brands: [],
    ratings: [],
    sortBy: 'newest',
  },

  setCategoryFilter: (categories) =>
    set((state) => ({
      filters: { ...state.filters, categories },
    })),

  setPriceRange: (priceRange) =>
    set((state) => ({
      filters: { ...state.filters, priceRange },
    })),

  setBrandFilter: (brands) =>
    set((state) => ({
      filters: { ...state.filters, brands },
    })),

  setRatingFilter: (ratings) =>
    set((state) => ({
      filters: { ...state.filters, ratings },
    })),

  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),

  clearFilters: () =>
    set({
      filters: {
        categories: [],
        priceRange: [0, 10000],
        brands: [],
        ratings: [],
        sortBy: 'newest',
      },
    }),
}));
