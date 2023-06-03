import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsListComponent } from './pages/admin-products-list/admin-products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminProductsListComponent, ProductFormComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, TranslateModule],
})
export class AdminModule {}
