import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { LayoutsModule } from '@layouts/layouts.module';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, SharedModule, LayoutsModule],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductRatingComponent,
  ],
})
export class ProductModule {}
