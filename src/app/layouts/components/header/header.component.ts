import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = new BehaviorSubject<User>(undefined);

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.cartService.cartDto$.next([]);
      this.cartService.cartInfo.next(undefined);
      this.router.navigate(['/product']);
    });
  }
}
