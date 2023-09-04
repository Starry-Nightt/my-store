import { map, switchMap, tap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductFilterPayload } from '../../product-interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  limit: number = 20;
  hasMore = false;
  form = this.fb.group({
    skip: [0],
    limit: [this.limit],
  });
  allCategories: string[] = [];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getProducts();
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
