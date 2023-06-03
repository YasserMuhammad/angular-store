import { Injectable } from '@angular/core';
import { TableService } from 'src/app/core/services/table/table.service';
import { XhrService } from 'src/app/core/services/xhr/xhr.service';
import { IProduct } from '../../store/interfaces/product';
import { Observable } from 'rxjs';
/**
 *
 *
 * @export
 * @class AdminProductService
 * @extends {TableService}
 */
@Injectable({
  providedIn: 'root',
})
export class AdminProductService extends TableService {
  /**
   * Creates an instance of AdminProductService.
   * @param {XhrService} xhrService
   * @memberof AdminProductService
   */
  constructor(xhrService: XhrService) {
    super(xhrService);
  }
  /**
   * This function deletes a product with a specific ID using an HTTP DELETE request and returns an
   * observable of the deleted product.
   *
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * product that needs to be deleted.
   * @return {*}  {Observable<IProduct>} The `deleteProduct` method is returning an Observable of type `IProduct`.
   * @memberof AdminProductService
   */
  deleteProduct(id: number): Observable<IProduct> {
    return this.xhrService.delete(`products/${id}`);
  }

  /**
   * This function updates a product with the given form data and ID using an HTTP PUT request.
   *
   * @param {IProduct} form - IProduct interface, which represents the data of a product that needs to be
   * updated.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * product that needs to be updated. It is used in the URL of the PUT request to specify which product
   * should be updated.
   * @return {*}  {Observable<IProduct>} The `updateProduct` method is returning an Observable of type `IProduct`.
   * @memberof AdminProductService
   */
  updateProduct(form: IProduct, id: number): Observable<IProduct> {
    return this.xhrService.put(`products/${id}`, form);
  }

  /**
   * This function adds a product to the server using an HTTP POST request.
   *
   * @param {IProduct} form - IProduct interface, which defines the structure of the product object
   * being passed as a parameter to the function.
   * @return {*}  {Observable<IProduct>} The `addProduct` function is returning an Observable of type `IProduct`. It is making a
   * POST request to the `products` endpoint with the `form` data and returning the response as an
   * Observable.
   * @memberof AdminProductService
   */
  addProduct(form: IProduct): Observable<IProduct> {
    return this.xhrService.post(`products`, form);
  }
}
