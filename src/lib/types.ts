export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number; // 0-5
  imageUrl: string;
  stock: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderItem = {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  price: number; // unit price
  totalAmount: number; // price * quantity
};

export type Address = {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderStatus = "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";

export type Order = {
  id: string;
  createdAt: string; // ISO date
  items: OrderItem[];
  total: number;
  address: Address;
  status: OrderStatus;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};


