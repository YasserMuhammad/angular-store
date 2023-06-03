import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  imports: [CommonModule, StoreRoutingModule, SharedModule, TranslateModule],
  declarations: [ProductsListComponent, ProductComponent, ProductDetailsComponent],
})
export class StoreModule {}
