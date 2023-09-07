import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    this.authService.user$
      .asObservable()
      .pipe(
        switchMap((res) => {
          if (!res) return of(undefined);
          return this.cartService.getCart();
        })
      )
      .subscribe();
  }
}
