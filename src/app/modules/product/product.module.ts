import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, SharedModule],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductRatingComponent,
    ProductDetailComponent,
  ],
})
export class ProductModule {}
