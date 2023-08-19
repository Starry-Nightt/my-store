import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, SharedModule],
  declarations: [ProductComponent, ProductListComponent],
})
export class ProductModule {}
