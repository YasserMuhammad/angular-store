import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../interfaces/product';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'stc-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  numberOfProducts: number = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  selectedCategory: string = '';
  categories: string[] = [];
  productList: IProduct[] = [];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private productService: ProductService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategoties();
  }

  getAllProducts() {
    this.productService
      .getAllProducts(this.numberOfProducts)
      .subscribe((res: IProduct[]) => {
        this.productList = res;
      });
  }
  getAllCategoties() {
    this.productService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res;
    });
  }

  selectCategory(event: any) {
    event == ''
      ? this.getAllProducts()
      : this.productService
          .getAllProductsBasedOnCategory(
            this.selectedCategory,
            this.numberOfProducts
          )
          .subscribe((res: IProduct[]) => {
            this.productList = res;
          });
  }

  /**
   * The function updates the number of products to be displayed and retrieves all products accordingly.
   * @param {number} event - The parameter "event" is of type number and is used to pass the number of
   * products to be displayed on a page. It is used in a function called "selectLimit" which sets the
   * value of "numberOfProducts" to the passed in "event" value and then calls the "getAllProducts
   * @memberof ProductsListComponent
   */
  selectLimit(event: number) {
    this.numberOfProducts = event;
    this.getAllProducts();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
