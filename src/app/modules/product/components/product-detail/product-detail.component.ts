import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@models/product.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  images: string[] = [];
  selectedIdx: number = 0;
  relatedProduct$: Observable<Product[]>;
  productId: number;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  @ViewChild('image') image: ElementRef;

  ngOnInit() {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map((param) => param.get('id')),
      switchMap((id) => this.productService.getProductById(Number(id))),
      tap((res) => {
        this.images = res.images;
        this.productId = res.id;
      })
    );

    this.relatedProduct$ = this.product$.pipe(
      switchMap((res) =>
        this.productService.getProductsOfCategory(res.category)
      ),
      map((res) =>
        res.products.filter((product) => product.id !== this.productId)
      )
    );
  }

  prevImage() {
    this.selectedIdx =
      this.selectedIdx > 0 ? this.selectedIdx - 1 : this.images.length - 1;
  }

  nextImage() {
    this.selectedIdx = (this.selectedIdx + 1) % this.images.length;
  }

  discountedPrice(product: Product) {
    return (
      Math.round(product.price * (1 - product.discountPercentage / 100) * 100) /
      100
    );
  }

  onAddToCart(id: number) {
    this.cartService.addToCart({ id, quantity: 1 }).subscribe((res) => {
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
  }

  onPaid() {
    this.router.navigate(['/cart/payment']);
  }

  trackId(index: number, item: any) {
    return item?.id ? item.id : item;
  }

  get selectedImage() {
    return this.images[this.selectedIdx];
  }
}
