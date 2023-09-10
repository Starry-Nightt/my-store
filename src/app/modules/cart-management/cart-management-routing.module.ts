import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartManagementComponent } from './cart-management.component';
import { CartListComponent } from './cart-list/cart-list.component';

const routes: Routes = [
  {
    path: '',
    component: CartManagementComponent,
    children: [
      {
        path: '',
        component: CartListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartManagementRoutingModule {}
