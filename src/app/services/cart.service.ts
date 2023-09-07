import { map, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, tap, merge } from 'rxjs';
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
      tap((res) => this.cartInfo.next(res)),
      switchMap(() => this.updateCart())
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

  addToCart(item: CartItem) {
    const cartDto = this.cartDto$.getValue();
    const idx = cartDto.findIndex((_item) => _item.id === item.id);
    if (idx !== -1) cartDto[idx].quantity += item.quantity;
    else cartDto.push(item);
    this.cartDto$.next(cartDto);
    if (this.authService.isLoggedIn) this.updateCart().subscribe();
  }

  removeFromCart(id: number) {
    const cartDto = this.cartDto$.getValue();
    const idx = cartDto.findIndex((_item) => _item.id === id);
    if (idx === -1) return;
    cartDto.splice(idx, 1);
    this.cartDto$.next(cartDto);
    if (this.authService.isLoggedIn) this.updateCart().subscribe();
  }

  updateCartItem(item: CartItem) {
    const cartDto = this.cartDto$.getValue();
    const idx = cartDto.findIndex((_item) => _item.id === item.id);
    if (idx === -1) return;
    cartDto[idx].quantity += item.quantity;
    this.cartDto$.next(cartDto);
    if (this.authService.isLoggedIn) this.updateCart().subscribe();
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
