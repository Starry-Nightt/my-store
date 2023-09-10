import { map, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, tap, merge, of } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CartInfo } from '@models/cart-info';
import { AppHttpClientService } from './app-http-client.service';
import { CartItem } from '@models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userId: string;
  cartInfo = new BehaviorSubject<CartInfo>(undefined);
  cartDto$ = new BehaviorSubject<CartItem[]>([]);
  constructor(
    private http: AppHttpClientService,
    private authService: AuthService
  ) {}

  getCart(): Observable<CartInfo> {
    this.userId = this.authService.user$.getValue()?.id;
    return this.http.get(`/carts/user/${this.userId}`).pipe(
      map((res: any) => res?.carts?.[0]),
      tap((res: CartInfo) => {
        this.cartInfo.next(res);
        const cartDto: CartItem[] = res?.products.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }));
        this.cartDto$.next(cartDto);
      })
    );
  }

  updateCart(): Observable<CartInfo> {
    const cartId = this.cartInfo.getValue()?.id;
    return this.http
      .put<CartInfo>(`/carts/${cartId}`, {
        merge: false,
        products: this.cartDto$.getValue(),
      })
      .pipe(tap((res) => this.cartInfo.next(res)));
  }

  addToCart(item: CartItem): Observable<CartInfo> {
    if (!this.authService.isLoggedIn$.getValue()) return of(undefined);
    const cartDto = this.cartDto$.getValue();
    const idx = cartDto.findIndex((_item) => _item.id === item.id);
    if (idx !== -1) cartDto[idx].quantity += item.quantity;
    else cartDto.push(item);
    this.cartDto$.next(cartDto);
    return this.updateCart();
  }

  removeFromCart(ids: number[]): Observable<CartInfo> {
    if (!this.authService.isLoggedIn$.getValue()) return of(undefined);
    const cartDto = this.cartDto$.getValue();
    const updatedCartDto = cartDto.filter((item) => !ids.includes(item.id));
    this.cartDto$.next(updatedCartDto);
    return this.updateCart();
  }

  buyInCart(ids: number[]): Observable<CartInfo> {
    if (!this.authService.isLoggedIn$.getValue()) return of(undefined);
    const cartDto = this.cartDto$.getValue();
    const updatedCartDto = cartDto.filter((item) => !ids.includes(item.id));
    this.cartDto$.next(updatedCartDto);
    return this.updateCart();
  }

  updateCartItem(item: CartItem): Observable<CartInfo> {
    if (!this.authService.isLoggedIn$.getValue()) return of(undefined);
    const cartDto = this.cartDto$.getValue();
    const idx = cartDto.findIndex((_item) => _item.id === item.id);
    if (idx === -1) return of(undefined);
    cartDto[idx].quantity = item.quantity;
    this.cartDto$.next(cartDto);
    return this.updateCart();
  }

  clearCart() {
    this.cartDto$.next([]);
    return this.updateCart();
  }

  // createCart(data: CartItem[]): Observable<CartInfo> {
  //   return this.http
  //     .post<CartInfo>('/carts/add', {
  //       userId: this.userId,
  //       products: data,
  //     })
  //     .pipe(tap((res) => this.cartInfo.next(res)));
  // }

  // deleteCart(): Observable<CartInfo> {
  //   const cartId = this.cartInfo.getValue()?.id;
  //   return this.http
  //     .delete<CartInfo>(`/carts/${cartId}`)
  //     .pipe(tap((res) => this.cartInfo.next(res)));
  // }
}
