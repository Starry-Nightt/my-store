import { map, switchMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  totalProducts$ = new Observable<number>(undefined);
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.totalProducts$ = this.cartService.cartDto$.pipe(
      map((res) => res.length)
    );
    this.authService.isLoggedIn$
      .asObservable()
      .pipe(
        switchMap((res) => {
          if (!res) return this.cartService.clearCart();
          return this.cartService.getCart();
        })
      )
      .subscribe();
  }
}
