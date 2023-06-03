import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * A Injectable Service to handle the state of loading for API requests.
 *
 * @export
 * @class LoadingService
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /**
   * `private _isloading$` is a private property of the `LoadingService` class that holds a
   * `BehaviorSubject<boolean>` instance. The `BehaviorSubject` is initialized with a default value of
   * `false`.
   *
   * @private
   * @memberof LoadingService
   */
  private _isloading$ = new BehaviorSubject<boolean>(false);

  /**
   * This function returns an observable boolean value for the isLoading state.
   * @returns An Observable of boolean values is being returned. The value of the Observable is
   * determined by the current value of the private BehaviorSubject `_isloading$`.
   */

  /**
   * This function returns an observable boolean value for the isLoading state.
   *
   * @readonly
   * @type {Observable<boolean>}
   * @returns An Observable of boolean values is being returned. The value of the Observable is
   * determined by the current value of the private BehaviorSubject `_isloading$`.
   * @memberof LoadingService
   */
  get isloading$(): Observable<boolean> {
    return this._isloading$.asObservable();
  }

  /**
   * This function sets the loading status of a variable.
   *
   * @param {boolean} loadingStatus loadingStatus is a boolean parameter that represents the loading
   * status of a component or feature. It is used as an argument for the setLoading() method to update
   * the loading status of an observable. If loadingStatus is true, it means that the component or
   * feature is currently loading, and if it is false,
   * @memberof LoadingService
   */
  setLoading(loadingStatus: boolean) {
    this._isloading$.next(loadingStatus);
  }
}
