import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginTypeEnum } from 'src/app/core/enums/login-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * A FormGroup that holds login Form values.
   * @type {FormGroup}
   * @memberof LoginComponent
   */

  loginForm: FormGroup = new FormGroup({});

  /**
   * List of users Roles
   *
   * @memberof LoginComponent
   */
  loginTypes = LoginTypeEnum;

  /**
   *  Live subscription list
   *
   * @type {(Subscription | undefined)}
   * @memberof AppComponent
   */
  subscriptionList: Subscription[] = [];

  /**
   * Creates an instance of LoginComponent.
   * @param {Router} router
   * @param {FormBuilder} fb
   * @param {AuthService} authService
   * @memberof LoginComponent
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.initForm();
  }

  ngOnInit() {}
  /**
   * `initForm` is a method in the `LoginComponent` class that initializes the `loginForm` property
   * with a new instance of `FormGroup`. The `FormGroup` contains three form controls: `username`,
   * `password`, and `loginType`. The `username` control has a default value of `'mor_2314'` and is
   * required with a minimum length of 4 characters. The `password` control has a default value of
   * `'83r5^_'` and is required. The `loginType` control has no default value and is also required. The
   * `initForm` method is called in the constructor of the `LoginComponent` class to set up the form.
   *
   * @memberof LoginComponent
   */
  initForm() {
    this.loginForm = this.fb.group({
      username: ['mor_2314', [Validators.required, Validators.minLength(4)]],
      password: ['83r5^_', Validators.required],
      loginType: [null, Validators.required],
    });
  }
  /**
   *
   *
   * @param {FormGroup} form
   * @memberof LoginComponent
   */
  login(form: FormGroup): void {
    let reqBody = {
      username: form.value.username,
      password: form.value.password,
    };
    this.subscriptionList.push(
      this.authService.login(reqBody).subscribe((res: any) => {
        localStorage.setItem('token', res['token']);
        localStorage.setItem('userType', form.value.loginType);
        this.router.navigate(['/store/products']);
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
