import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/modules/store/interfaces/product';
import { XhrService } from '../xhr/xhr.service';
/**
 * A Injectable Service Parent Class user for:
 * Inheritance for Productlist/AdminProductList Services.
 *
 * @export
 * @class TableService
 */
@Injectable({
  providedIn: 'root',
})
export class TableService {
  /**
   * Creates an instance of TableService.
   * @param {XhrService} xhrService
   * @memberof TableService
   */
  constructor(public xhrService: XhrService) {}

  /**
   * This function returns an observable of an array of products with a default page limit of 5.
   *
   * @param {number} [pageLimit=5]The pageLimit parameter is a number that specifies the maximum
   * number of products to be returned per page. It has a default value of 5 if no value is provided when
   * the function is called.
   *
   * @return {*}  {Observable<IProduct[]>} The `getAllProducts` method is returning an Observable of an array of `IProduct` objects.
   * It is making a GET request to the `products` endpoint with a query parameter `limit` set to the
   * value of `pageLimit`, which is a number parameter with a default value of 5.
   * @memberof TableService
   */
  getAllProducts(pageLimit: number = 5): Observable<IProduct[]> {
    return this.xhrService.get<IProduct[]>(`products?limit=${pageLimit}`);
  }

  /**
   * This function returns an observable that retrieves all categories of products.
   *
   * @return {*}  {Observable<string[]>}
   * @memberof TableService
   */
  getAllCategories(): Observable<string[]> {
    return this.xhrService.get('products/categories');
  }

  /**
   * This function returns an observable of type IProduct containing details of a product with a given
   * ID.
   *
   * @param {number} id The `id` parameter is a number that represents the unique identifier of a
   * product.
   *
   * @return {*}  {Observable<IProduct>} The `getProductDetails` method is returning an Observable of type `IProduct`. It is making
   * a GET request to the `products` endpoint with the specified `id` and returning the response as an
   * Observable.
   *
   * @memberof TableService
   */
  getProductDetails(id: number): Observable<IProduct> {
    return this.xhrService.get<IProduct>(`products/${id}`);
  }
}
