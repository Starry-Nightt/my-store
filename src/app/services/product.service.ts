import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppHttpClientService } from './app-http-client.service';
import { ProductFilterPayload } from '../modules/product/product-interface';
import { MAX_PRICE, MIN_PRICE } from '../modules/product/product.const';

interface ProductListData {
  products: Product[];
  skip: number;
  total: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  searchKey$ = new BehaviorSubject<string>('');

  constructor(private http: AppHttpClientService) {}

  getAllProducts(params: any = {}): Observable<ProductListData> {
    return this.http.get<ProductListData>('/products', params);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>('/products/categories');
  }
}
