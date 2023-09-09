import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartManagementComponent } from './cart-management.component';
import { CartManagementRoutingModule } from './cart-management-routing.module';
import { SharedModule } from '@shared/shared.module';
import { LayoutsModule } from '@layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    CartManagementRoutingModule,
    SharedModule,
    LayoutsModule,
  ],
  declarations: [CartManagementComponent],
})
export class CartManagementModule {}
