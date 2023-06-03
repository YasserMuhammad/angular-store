import { Injectable } from '@angular/core';
import { XhrService } from 'src/app/core/services/xhr/xhr.service';

interface ILogin {
  username: string;
  password: string;
}
/**
 *
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @param {XhrService} xhrService
   * @memberof AuthService
   */
  constructor(private xhrService: XhrService) {}
  /**
   * This function sends a POST request to the 'auth/login' endpoint with the provided login credentials.
   *
   * @param {ILogin} body - The parameter "body" is an object of type ILogin which contains the user's
   * login credentials such as email and password. This object is passed as the request body in a POST
   * request to the 'auth/login' endpoint for user authentication.
   * @return {*} The `login` function is returning the result of a POST request to the 'auth/login' endpoint
   * with the provided `body` data. The specific data being returned depends on the server's response to
   * the request.
   * @memberof AuthService
   */
  login(body: ILogin) {
    return this.xhrService.post('auth/login', body);
  }
  /**
   *
   * The function removes the token and user type from local storage, effectively logging the user out.
   * @memberof AuthService
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }
}
