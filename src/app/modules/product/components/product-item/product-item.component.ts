import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@models/product.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  getStock() {
    return `Còn ${this.product.stock} sản phẩm`;
  }

  getDiscount() {
    return Math.floor(this.product?.discountPercentage) + '%';
  }

  onAddToCart(event: Event) {
    this.cartService
      .addToCart({ id: this.product.id, quantity: 1 })
      .subscribe((res) => {
        if (!res) {
          this.router.navigate(['/auth/login']);
          return;
        }
        this.toaster.success('Thêm vào giỏ hàng thành công', '', {
          timeOut: 3000,
          disableTimeOut: false,
          progressBar: true,
        });
      });
    event.stopPropagation();
  }

  onViewDetail(event: Event) {
    this.router.navigate([`/product/${this.product.id}`]);
    event.stopPropagation();
  }
}
