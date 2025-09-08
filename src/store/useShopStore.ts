"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { products as seedProducts, mixedCatalog } from "@/lib/data";
import { CartItem, Order, OrderItem, Product, User } from "@/lib/types";

type ShopState = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  isAuthenticated: boolean;
  // Filters
  searchQuery: string;
  selectedCategory: string | null;
  priceRange: [number, number] | null;
  minRating: number | null;
};

type ShopActions = {
  setSearchQuery: (query: string) => void;
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number] | null) => void;
  setMinRating: (rating: number | null) => void;

  addToCart: (productId: string) => void;
  buyNow: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  placeOrder: (order: Omit<Order, "id" | "createdAt" | "total" | "items"> & { items: CartItem[] }) => string;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;

  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Extend: surface mixed catalog alongside default products
  getMixedCatalog: () => Product[];
};

export const useShopStore = create<ShopState & ShopActions>()(
  persist(
    immer((set, get) => ({
      products: seedProducts,
      cart: [],
      orders: [], // Start with empty orders array
      user: null,
      isAuthenticated: false,
      searchQuery: "",
      selectedCategory: null,
      priceRange: null,
      minRating: null,

      setSearchQuery: (query) => set((state) => void (state.searchQuery = query)),
      setCategory: (category) => set((state) => void (state.selectedCategory = category)),
      setPriceRange: (range) => set((state) => void (state.priceRange = range)),
      setMinRating: (rating) => set((state) => void (state.minRating = rating)),

      addToCart: (productId) =>
        set((state) => {
          const existing = state.cart.find((c) => c.productId === productId);
          if (existing) {
            existing.quantity += 1;
          } else {
            state.cart.push({ productId, quantity: 1 });
          }
        }),
      buyNow: (productId) =>
        set((state) => {
          // Add to existing cart like addToCart, don't clear
          const existing = state.cart.find((c) => c.productId === productId);
          if (existing) {
            existing.quantity += 1;
          } else {
            state.cart.push({ productId, quantity: 1 });
          }
        }),
      removeFromCart: (productId) =>
        set((state) => {
          state.cart = state.cart.filter((c) => c.productId !== productId);
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const item = state.cart.find((c) => c.productId === productId);
          if (!item) return;
          if (quantity <= 0) {
            state.cart = state.cart.filter((c) => c.productId !== productId);
          } else {
            item.quantity = quantity;
          }
        }),
      clearCart: () => set((state) => void (state.cart = [])),

      placeOrder: (orderInput) => {
        const id = `ord_${Date.now().toString(36)}`;
        const createdAt = new Date().toISOString();
        
        // Convert CartItems to OrderItems with full product details
        const orderItems: OrderItem[] = orderInput.items.map((cartItem) => {
          const product = mixedCatalog.find((p) => p.id === cartItem.productId);
          if (!product) {
            throw new Error(`Product not found: ${cartItem.productId}`);
          }
          return {
            productId: cartItem.productId,
            productName: product.name,
            category: product.category,
            quantity: cartItem.quantity,
            price: product.price,
            totalAmount: product.price * cartItem.quantity,
          };
        });
        
        const total = orderItems.reduce((sum, item) => sum + item.totalAmount, 0);
        
        const order: Order = { 
          id, 
          createdAt, 
          total, 
          items: orderItems,
          address: orderInput.address,
          status: orderInput.status
        };
        
        set((state) => {
          state.orders.unshift(order);
          state.cart = [];
        });
        return id;
      },
      updateOrderStatus: (orderId, status) =>
        set((state) => {
          const ord = state.orders.find((o) => o.id === orderId);
          if (ord) ord.status = status;
        }),

      getMixedCatalog: () => {
        return mixedCatalog;
      },

      login: (email, password) => {
        // Simple mock authentication - in real app, this would call an API
        if (email && password) {
          const user: User = {
            id: "user_1",
            name: email.split("@")[0],
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split("@")[0])}&background=000000&color=ffffff&size=40`,
          };
          set((state) => {
            state.user = user;
            state.isAuthenticated = true;
          });
          return true;
        }
        return false;
      },

      logout: () =>
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.cart = [];
        }),
    })),
    {
      name: "shop-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders, // Persist orders for analytics
        products: state.products,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      version: 3, // Increment version to enable order persistence
      migrate: (persistedState, version) => {
        // Enable order persistence from version 3
        if (version < 3) {
          return {
            cart: [],
            orders: [], // Start fresh but will persist going forward
            products: seedProducts,
            user: null,
            isAuthenticated: false,
          };
        }
        return persistedState as any;
      },
    }
  )
);

export const selectCartCount = (state: ShopState) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);


