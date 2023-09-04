import { map, switchMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
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
          this.loading = true;
          this.form.setValue({ q: res, skip: 0, limit: this.limit });
          this.products = [];
        }),
        switchMap(() =>
          this.productService
            .getAllProducts(this.form.value)
            .pipe(map((res) => res.products))
        ),
        tap((res) => {
          this.products = [...this.products, ...res];
          this.hasMore = res.length > 0 ? true : false;
          const skip = this.skipCtrl.value + res.length;
          this.skipCtrl.setValue(skip);
          this.loading = false;
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
        this.products = [...this.products, ...res];
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

  get skipCtrl() {
    return this.form.get('skip');
  }
}
