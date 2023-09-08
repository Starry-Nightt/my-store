import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartManagementComponent } from './cart-management.component';

const routes: Routes = [
  {
    path: '',
    component: CartManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartManagementRoutingModule {}
