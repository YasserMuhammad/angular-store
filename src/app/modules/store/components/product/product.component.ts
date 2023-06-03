import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
/**
 *
 *
 * @export
 * @class ProductComponent
 */
@Component({
  selector: 'stc-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  /**
   * Product id.
   *
   * @type {(number | undefined)}
   * @memberof ProductComponent
   */
  @Input('id')
  id: number | undefined;
  /**
   * Title/Name of the Product
   *
   * @type {(string | undefined)}
   * @memberof ProductComponent
   */
  @Input('title')
  title: string | undefined;
  /**
   * Price of the Product
   *
   * @type {(string | undefined)}
   * @memberof ProductComponent
   */
  @Input('price')
  price: string | undefined;
  /**
   * Description of the product
   *
   * @type {(string | undefined)}
   * @memberof ProductComponent
   */
  @Input('description')
  description: string | undefined;
  /**
   *
   *
   * @type {(string | undefined)}
   * @memberof ProductComponent
   */
  @Input('category')
  category: string | undefined;
  /**
   * Prodcut image URL
   *
   * @type {(string | undefined)}
   * @memberof ProductComponent
   */
  @Input('image')
  image: string | undefined;
  /**
   *
   *
   * @type {({ rate: number; count: number } | undefined)}
   * @memberof ProductComponent
   */
  @Input('rating')
  rating: { rate: number; count: number } | undefined;
  /**
   * Creates an instance of ProductComponent.
   * @param {MatDialog} dialog
   * @memberof ProductComponent
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Open ProductDetailsComponent Dialog
   *
   * @memberof ProductComponent
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: { id: this.id },
    });
  }
}
