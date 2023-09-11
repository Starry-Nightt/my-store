import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-management',
  templateUrl: './cart-management.component.html',
  styleUrls: ['./cart-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartManagementComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
