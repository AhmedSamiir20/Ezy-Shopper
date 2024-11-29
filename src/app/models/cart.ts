import { Product } from "./product";

export interface CartItem {
  product: {
    id: string;
    title: string;
    price: number;
    description?: string; // Optional
    image?: string; // Optional
  };
  quantity: number;
}
