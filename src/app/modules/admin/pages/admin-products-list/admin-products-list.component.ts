import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/store/services/product/product.service';
import { AdminProductService } from '../../services/admin-product.service';
import { IProduct } from 'src/app/modules/store/interfaces/product';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'stc-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.scss'],
})
export class AdminProductsListComponent implements OnInit, OnDestroy {
  /**
   * Number of shown products
   *
   * @type {number}
   * @memberof AdminProductsListComponent
   */
  numberOfProducts: number = 5;
  /**
   * List of available number of shown products
   *
   * @type {number[]}
   * @memberof AdminProductsListComponent
   */
  pageSizeOptions: number[] = [5, 10, 15, 20];

  /**
   * An array of objects of type `IProduct`. It is initialized as an empty array `[]`.
   *
   * This variable is used to store the list of products retrieved from the server and display them in
   * the template.
   * @type {IProduct[]}
   * @memberof AdminProductsListComponent
   */
  productList: IProduct[] = [];

  /**
   * an array of strings that defines the columns to be displayed in the table in
   * the template. Each string represents the name of a column in the table. In this case, the columns
   * are 'id', 'title', 'price', 'category', and 'actions'.
   *
   * @type {string[]}
   * @memberof AdminProductsListComponent
   */
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'actions'];

  /**
   *  Live subscription list
   *
   * @type {(Subscription | undefined)}
   * @memberof AppComponent
   */
  subscriptionList: Subscription[] = [];

  /**
   * Creates an instance of AdminProductsListComponent.
   * @param {AdminProductService} productService
   * @param {MatDialog} dialog
   * @memberof AdminProductsListComponent
   */
  constructor(
    private productService: AdminProductService,
    private dialog: MatDialog
  ) {}

  /**
   * Angular lifehook is used for:
   * Get List of Products to be shown in API.
   *
   * @memberof AdminProductsListComponent
   */
  ngOnInit(): void {
    this.getAllProducts();
  }

  /**
   * The function retrieves all products from a product service and assigns them to a product list.
   *
   * @memberof AdminProductsListComponent
   */
  getAllProducts() {
    this.subscriptionList.push(
      this.productService
        .getAllProducts(this.numberOfProducts)
        .subscribe((res) => {
          this.productList = res;
        })
    );
  }

  /**
   * This function sends a DELETE request to the server to delete the product with the specified `id`
   *
   * @param {number} id
   * @memberof AdminProductsListComponent
   */
  deleteProduct(id: number) {
    this.subscriptionList.push(
      this.productService.deleteProduct(id).subscribe((res) => {
        console.log(res);
      })
    );
  }

  /**
   * is a function that is called when the user selects a new page size option from the
   * paginator in the template. It takes in an event of type `PageEvent` which contains information
   * about the new page size selected by the user. The function updates the `numberOfProducts` variable
   * with the new page size selected by the user and calls the `getAllProducts` function to retrieve
   * the updated list of products from the server based on the new page size
   *
   * @param {PageEvent} event
   * @memberof AdminProductsListComponent
   */
  selectLimit(event: PageEvent) {
    this.numberOfProducts = event.pageSize;
    this.getAllProducts();
  }
  /**
   * This function opens a dialog box for editing a product with a given ID.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
   * product. It is used as data to be passed to the `ProductFormComponent` when opening a dialog box for
   * editing a product.
   * @param {number} id
   * @memberof AdminProductsListComponent
   */
  editProduct(id: number): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: { id: id },
    });
  }

  /**
   * The function opens a dialog box for adding a product.
   *
   * @memberof AdminProductsListComponent
   */
  addProduct(): void {
    const dialogRef = this.dialog.open(ProductFormComponent);
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
