export interface Order {
    id: string;
    name: string;
    address: string;
    paymentMethod: string;
    items: { productId: string; quantity: number }[];
    total: number;
  }
  