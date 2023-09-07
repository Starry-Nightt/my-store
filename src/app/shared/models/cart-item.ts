export class CartItemInfo {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface CartItem {
  id: number;
  quantity: number;
}
