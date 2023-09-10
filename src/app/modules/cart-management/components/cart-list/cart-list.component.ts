import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartInfo } from '@models/cart-info';
import { CartService } from 'src/app/services/cart.service';
import { CartItemInfo } from '@models/cart-item';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  cartInfo$: Observable<CartInfo>;
  cartItemMap: Record<string, CartItemInfo> = {};
  cartCheckMap: Record<string, boolean> = {};
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartInfo$ = this.cartService.cartInfo.asObservable().pipe(
      tap((res) => {
        if (!res?.products) return;
        res.products.forEach((product) => {
          this.cartItemMap[product.id] = product;
          this.cartCheckMap[product.id] = false;
        });
      })
    );
  }

  onCheckAll(event: MatCheckboxChange) {
    Object.keys(this.cartCheckMap).forEach((key) => {
      this.cartCheckMap[key] = event.checked;
    });
  }

  onPaid(event: boolean) {
    if (!event) return;
    const ids = Object.keys(this.cartCheckMap)
      .filter((item) => !!this.cartCheckMap[item])
      .map((id) => Number(id));
    this.cartService.buyInCart(ids).subscribe(() => {
      this.resetCartCheckMap();
      this.router.navigate(['/cart/payment']);
    });
  }

  onRemoveSelected(event: boolean) {
    if (!event) return;
    const ids = Object.keys(this.cartCheckMap)
      .filter((item) => !!this.cartCheckMap[item])
      .map((id) => Number(id));
    this.cartService.removeFromCart(ids).subscribe(() => {
      this.resetCartCheckMap();
    });
  }

  resetCartCheckMap() {
    Object.keys(this.cartCheckMap).forEach((key) => {
      this.cartCheckMap[key] = false;
    });
  }

  get isCheckAll() {
    return (
      Object.keys(this.cartCheckMap).length &&
      Object.keys(this.cartCheckMap).every((key) => !!this.cartCheckMap[key])
    );
  }

  get checkedQuantity() {
    return Object.keys(this.cartCheckMap).filter(
      (item) => !!this.cartCheckMap[item]
    ).length;
  }

  get totalPayment() {
    return Object.keys(this.cartItemMap).reduce((prev, cur) => {
      if (!!this.cartCheckMap[cur])
        return prev + this.cartItemMap[cur].discountedPrice;
      return prev;
    }, 0);
  }
}
