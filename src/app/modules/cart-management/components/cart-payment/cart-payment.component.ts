import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss'],
})
export class CartPaymentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  returnCart() {
    this.router.navigate(['/cart']);
  }

  viewProduct() {
    this.router.navigate(['/product']);
  }
}
