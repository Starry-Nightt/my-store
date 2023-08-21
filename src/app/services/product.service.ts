import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
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
  constructor(private http: AppHttpClientService) {}

  getAllProducts(params: any = {}): Observable<ProductListData> {
    return this.http.get<ProductListData>('/products', params);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }
}
