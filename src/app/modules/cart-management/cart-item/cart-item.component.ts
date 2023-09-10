import { Component, Input, OnInit } from '@angular/core';
import { CartItemInfo } from '@models/cart-item';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() data: CartItemInfo;
  productInfo$: Observable<Product>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productInfo$ = this.productService.getProductById(this.data.id);
  }

  get discountedPriceByItem() {
    return (
      Math.round(
        this.data.price * (1 - this.data.discountPercentage / 100) * 100
      ) / 100
    );
  }
}
