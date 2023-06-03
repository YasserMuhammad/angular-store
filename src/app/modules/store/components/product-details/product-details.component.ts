import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { IProduct } from '../../interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stc-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productObj: IProduct | undefined;

  /**
   *  Live subscription list
   *
   * @type {(Subscription | undefined)}
   * @memberof AppComponent
   */
  subscriptionList: Subscription[] = [];

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }
  getProductDetails() {
    this.subscriptionList.push(
      this.productService
        .getProductDetails(this.data.id)
        .subscribe((res: IProduct) => {
          console.log(res);
          this.productObj = res;
        })
    );
  }

  /**
   * Angular lifehook is used for:
   * - Terminate the subscription for Observables changes
   *
   * @memberof AppComponent
   */
  ngOnDestroy(): void {
    this.subscriptionList.forEach((sb) => sb.unsubscribe());
  }
}
