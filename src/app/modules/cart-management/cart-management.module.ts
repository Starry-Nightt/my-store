import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartManagementComponent } from './cart-management.component';
import { CartManagementRoutingModule } from './cart-management-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartInvoiceComponent } from './components/cart-invoice/cart-invoice.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartPaymentComponent } from './components/cart-payment/cart-payment.component';

@NgModule({
  imports: [CommonModule, CartManagementRoutingModule, SharedModule],
  declarations: [
    CartManagementComponent,
    CartListComponent,
    CartItemComponent,
    CartInvoiceComponent,
    CartPaymentComponent,
  ],
})
export class CartManagementModule {}
