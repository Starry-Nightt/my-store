import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartManagementComponent } from './cart-management.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartPaymentComponent } from './components/cart-payment/cart-payment.component';

const routes: Routes = [
  {
    path: '',
    component: CartManagementComponent,
    children: [
      {
        path: '',
        component: CartListComponent,
      },
      {
        path: 'payment',
        component: CartPaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartManagementRoutingModule {}
