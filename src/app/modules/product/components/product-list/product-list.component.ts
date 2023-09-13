import { map, switchMap, tap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  limit: number = 24;
  hasMore = false;
  form = this.fb.group({
    q: ['a'],
    skip: [0],
    limit: [this.limit],
  });
  allCategories: string[] = [];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.productService.searchKey$
      .asObservable()
      .pipe(
        tap((res) => {
          this.loading.next(true);
          this.form.setValue({ q: res, skip: 0, limit: this.limit });
          this.products.next([]);
        }),
        switchMap(() =>
          this.productService
            .getAllProducts(this.form.value)
            .pipe(map((res) => res.products))
        ),
        tap((res) => {
          this.products.next([...this.products.getValue(), ...res]);
          this.hasMore = res.length > 0 ? true : false;
          const skip = this.skipCtrl.value + res.length;
          this.skipCtrl.setValue(skip);
          this.loading.next(false);
        })
      )
      .subscribe();
    this.getCategories();
  }

  getProducts() {
    this.productService
      .getAllProducts(this.form.value)
      .pipe(map((res) => res.products))
      .subscribe((res) => {
        this.products.next([...this.products.getValue(), ...res]);

        this.hasMore = res.length > 0 ? true : false;
        const skip = this.skipCtrl.value + res.length;
        this.skipCtrl.setValue(skip);
      });
  }

  getCategories() {
    this.productService.getAllCategories().subscribe((res) => {
      this.allCategories = res;
    });
  }

  onHandleScroll(event: boolean) {
    if (!event) return;
    this.getProducts();
  }

  onViewAll() {
    this.productService.searchKey$.next('');
  }

  get skipCtrl() {
    return this.form.get('skip');
  }
}
