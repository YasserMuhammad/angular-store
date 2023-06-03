import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
/**
 * A Injectable Service to handle Alerts for API requests.
 *
 * @export
 * @class AlertService
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Creates an instance of AlertService.
   * @param {ToastrService} toastr
   * @memberof AlertService
   */
  constructor(private toastr: ToastrService) {}

  /**
   * This function displays an information message using the Toastr library.
   *
   * @param {string} message - A string parameter representing the message to be displayed in a success
   * notification.
   *
   * @memberof AlertService
   */
  success(message: string) {
    this.toastr.success(message);
  }

  /**
   * This function displays an information message using the Toastr library.
   *
   * @param {string} message - A string parameter representing the message to be displayed in a info
   * notification.
   *
   * @memberof AlertService
   */
  info(message: string) {
    this.toastr.info(message);
  }

  /**
   * This function displays an information message using the Toastr library.
   *
   * @param {string} message - A string parameter representing the message to be displayed in a warning
   * notification.
   *
   * @memberof AlertService
   */
  warning(message: string) {
    this.toastr.warning(message);
  }

  /**
   * This function displays an information message using the Toastr library.
   *
   * @param {string} message - A string parameter representing the message to be displayed in a error
   * notification.
   *
   * @memberof AlertService
   */
  error(message: string) {
    this.toastr.error(message);
  }
}
