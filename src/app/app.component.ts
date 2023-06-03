import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { AuthService } from './core/services/auth/auth.service';
import { LocalizationService } from './core/services/localization/localization.service';
import { Localization } from './core/enums/localization.enum';
import { LoadingService } from './core/services/loading/loading.service';
/**
 *
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'stc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;
  /**
   * Direction of the Parent body div
   *
   * @type {('ltr' | 'rtl')}
   * @memberof AppComponent
   */
  direction: 'ltr' | 'rtl' = 'ltr';

  /**
   *  Live subscription list for the language / Loading changes
   *
   * @type {(Subscription | undefined)}
   * @memberof AppComponent
   */
  subscriptionList: Subscription[] = [];

  /**
   * Creates an instance of AppComponent.
   * @param {LocalizationService} localization
   * @param {LoadingService} loadingService
   * @memberof AppComponent
   */
  constructor(
    private localization: LocalizationService,
    private loadingService: LoadingService
  ) {
    this.localization.addLang([Localization.English, Localization.Arabic]);
  }

  /**
   * Angular lifehook is used for:
   * - Start the subscription for language changes
   * - Set the direction of the Parent body div
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this.updateLoadingStatus();
    this.subscriptionList.push(
      this.localization.onLangChange().subscribe(() => {
        this.direction = this.localization.isRtl() ? 'rtl' : 'ltr';
      })
    );
  }

  /**
   * This function subscribes to a loading service and updates the value of a boolean variable based on
   * the response.
   * @memberof AppComponent
   */
  updateLoadingStatus() {
    this.subscriptionList.push(
      this.loadingService.isloading$.subscribe((res) => {
        this.showLoading = res;
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
