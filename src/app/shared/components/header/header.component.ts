import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Localization } from 'src/app/core/enums/localization.enum';
import { LocalizationService } from 'src/app/core/services/localization/localization.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
/**
 *
 *
 * @export
 * @class HeaderComponent
 */
@Component({
  selector: 'stc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * Creates an instance of HeaderComponent.
   * @param {LocalizationService} locale
   * @param {AuthService} authService
   * @param {Router} router
   * @memberof HeaderComponent
   */
  constructor(
    private locale: LocalizationService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * `changeLang` is a method in the `HeaderComponent` class that toggles the language between English
   * and Arabic. It checks if the current language is right-to-left (RTL) using the `isRtl()` method
   * from the `LocalizationService` and sets the language to English if it is currently Arabic, and
   * vice versa.
   *
   * @memberof HeaderComponent
   */
  changeLang() {
    this.locale.isRtl()
      ? this.locale.setLang(Localization.English)
      : this.locale.setLang(Localization.Arabic);
  }
  /**
   * logout()
   *
   * @memberof HeaderComponent
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
