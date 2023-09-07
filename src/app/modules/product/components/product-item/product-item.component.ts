import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  getStock() {
    return `Còn ${this.product.stock} sản phẩm`;
  }

  getDiscount() {
    return Math.floor(this.product?.discountPercentage) + '%';
  }

  onAddToCart() {
    this.cartService.addToCart({ id: this.product.id, quantity: 1 });
  }
}
