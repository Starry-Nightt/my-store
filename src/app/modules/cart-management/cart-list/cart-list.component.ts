import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartInfo } from '@models/cart-info';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  cartInfo$: Observable<CartInfo>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartInfo$ = this.cartService.cartInfo.asObservable();
  }
}
