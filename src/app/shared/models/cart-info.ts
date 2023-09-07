import { CartItemInfo } from './cart-item';

export class CartInfo {
  id: string;
  userId: string;
  products: CartItemInfo[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  isDeleted?: boolean;
}
