import { debounceTime } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CartItemInfo } from '@models/cart-item';
import { Product } from '@models/product.model';
import { Observable, tap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() data: CartItemInfo;
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  productInfo$: Observable<Product>;

  quantityCtrl = new FormControl(undefined, [Validators.required]);
  stock: number;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productInfo$ = this.productService
      .getProductById(this.data.id)
      .pipe(tap((res) => (this.stock = res.stock)));
    this.quantityCtrl.setValue(this.data.quantity);

    this.quantityCtrl.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      if (!res) this.quantityCtrl.setValue(1, { emitEvent: false });
      if (res > this.stock)
        this.quantityCtrl.setValue(this.stock, { emitEvent: false });
      this.cartService
        .updateCartItem({
          id: this.data.id,
          quantity: this.quantityCtrl.value,
        })
        .subscribe();
    });
  }

  get discountedPriceByItem() {
    return (
      Math.round(
        this.data.price * (1 - this.data.discountPercentage / 100) * 100
      ) / 100
    );
  }

  onIncreaseQuantity() {
    const quantity = this.quantityCtrl.value;
    if (quantity < this.stock)
      this.quantityCtrl.setValue(this.quantityCtrl.value + 1);
  }

  onDecreaseQuantity() {
    const quantity = this.quantityCtrl.value;
    if (quantity > 1) this.quantityCtrl.setValue(quantity - 1);
  }

  onRemove() {
    this.cartService.removeFromCart([this.data.id]).subscribe();
  }

  onChecked(event: MatCheckboxChange) {
    this.checkedChange.emit(event.checked);
  }
}
