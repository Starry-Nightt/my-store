import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartManagementComponent } from './cart-management.component';
import { CartManagementRoutingModule } from './cart-management-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  imports: [CommonModule, CartManagementRoutingModule, SharedModule],
  declarations: [CartManagementComponent, CartListComponent, CartItemComponent],
})
export class CartManagementModule {}
