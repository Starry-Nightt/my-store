import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartManagementComponent } from './cart-management.component';
import { CartManagementRoutingModule } from './cart-management-routing.module';

@NgModule({
  imports: [CommonModule, CartManagementRoutingModule],
  declarations: [CartManagementComponent],
})
export class CartManagementModule {}
