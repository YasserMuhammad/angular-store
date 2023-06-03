import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { XhrService } from 'src/app/core/services/xhr/xhr.service';
import { IProduct } from '../../interfaces/product';
import { TableService } from 'src/app/core/services/table/table.service';
/**
 *
 *
 * @export
 * @class ProductService
 * @extends {TableService}
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService extends TableService {
  /**
   * Creates an instance of ProductService.
   * @param {XhrService} xhrService
   * @memberof ProductService
   */
  constructor(xhrService: XhrService) {
    super(xhrService);
  }
  /**
   * This function retrieves all products based on a specified category with an optional page limit.
   * @param {string} category - a string representing the category of products to retrieve.
   * @param {number} [pageLimit=5] - pageLimit is a number parameter that specifies the maximum number of
   * products to be returned per page when fetching products based on a category. The default value is
   * set to 5 if no value is provided.
   * @return {*}  {Observable<IProduct[]>} an Observable of an array of IProduct objects that belong to a specific category, with a
   * limit of pageLimit number of products per page.
   * @memberof ProductService
   */
  getAllProductsBasedOnCategory(
    category: string,
    pageLimit: number = 5
  ): Observable<IProduct[]> {
    return this.xhrService.get<IProduct[]>(
      `products/category/${category}?limit=${pageLimit}`
    );
  }
}
