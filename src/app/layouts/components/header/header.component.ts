import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;
  // categories: string[] = [
  //   'smartphones',
  //   'laptops',
  //   'fragrances',
  //   'skincare',
  //   'groceries',
  //   'home-decoration',
  //   'furniture',
  //   'tops',
  //   'womens-dresses',
  //   'womens-shoes',
  //   'mens-shirts',
  // ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.user;
  }

  login() {
    this.router.navigate(['/login']);
  }
}
