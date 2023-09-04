import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppHttpClientService } from './app-http-client.service';

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
    return this.http.get<ProductListData>('/products/search', params);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>('/products/categories');
  }
}
