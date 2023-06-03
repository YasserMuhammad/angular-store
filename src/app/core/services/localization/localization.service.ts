import { EventEmitter, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Localization } from '../../enums/localization.enum';
import { Observable } from 'rxjs';
/**
 * A Injectable Service to handle Translations acroos all application.
 *
 * @export
 * @class LocalizationService
 */
@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  /**
   * Used to store the Available Supported languages
   *
   * @private
   * @type {string[]}
   * @memberof LocalizationService
   */
  private systemAvilabelLang: string[] = [];

  /**
   * Creates an instance of LocalizationService.
   * @param {TranslateService} translate
   * @memberof LocalizationService
   */
  constructor(private translate: TranslateService) {
    this.init();
    this.systemAvilabelLang = this.translate.getLangs();
  }

  /**
   * the default lang for app
   *
   * @return {*}  {string}
   * @memberof LocalizationService
   * @returns the default lang for app
   */
  defaultLanguage(): string {
    return this.translate.defaultLang;
  }

  /**
   * the current used lang in app
   *
   * @return {*}  {string}
   * @memberof LocalizationService
   * @returns the current used lang in app
   */
  selectedLang(): string {
    return this.translate.currentLang;
  }

  /**
   * A LangChangeEvent is an object with the properties lang: string & translations: any (an object containing your translations) ".
   *
   * @return {*}  {EventEmitter<LangChangeEvent>} " An EventEmitter to listen to lang change events.
   * @memberof LocalizationService
   */
  onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translate.onLangChange;
  }

  /**
   * Currently available langs.
   *
   * @return {*}  {string[]} Returns an array of currently available langs.
   * @memberof LocalizationService
   */
  listOfLangs(): string[] {
    return this.translate.getLangs();
  }

  /**
   * To check If the current lang is arabic or no,
   * Also check direction of the application
   *
   * @return {*}  {boolean}
   * @memberof LocalizationService
   */
  isRtl(): boolean {
    return this.selectedLang() === Localization.Arabic;
  }

  /**
   * The Add Lang Method is used to add new language to app
   *
   * @param {string[]} lang
   * @memberof LocalizationService
   */
  addLang(lang: string[]): void {
    this.translate.addLangs(lang);
  }

  /**
   * The Init Method is used to
   * - check if localstorage have lang if not set "en" as default
   *
   * @private
   * @memberof LocalizationService
   */
  private init(): void {
    let localStorageLang = localStorage.getItem('userLang') || 'en';
    this.setLang(localStorageLang);
  }

  /**
   * Use to set Chooses lang as current lang and save selected lang in localstorage
   *
   * @param {string} lang An identifying name for selected lang, should be string
   * @memberof LocalizationService
   */
  setLang(lang: string): void {
    this.translate.use(lang).subscribe(() => {
      localStorage.setItem('userLang', lang);
    });
  }

  /**
   * Use to set Chooses lang as default lang
   * @param lang An identifying name for selected lang, should be string
   **/
  addDefaultLang(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  /**
   * Gets an object of translations for a given language
   * @param lang An identifying name for selected lang, should be string
   * @returns Observable contain object of selected lang
   **/
  listOfTranslations(lang: string): Observable<any> {
    return this.translate.getTranslation(lang);
  }

  /**
   * Manually sets an object of translations for a given language,
   * set shouldMerge to true if you want to append the translations instead of replacing them
   *
   * @param {string} lang
   * @param {Object} translations
   * @param {boolean} [shouldMerge=false]
   * @memberof LocalizationService
   */
  addTranslation(
    lang: string,
    translations: Object,
    shouldMerge: boolean = false
  ): void {
    this.translate.setTranslation(lang, translations, shouldMerge);
  }

  /**
   *
   * @param {(string | Array<string>)} key
   * @param {Object} [interpolateParams]
   * @return {Observable <string | Object>} Gets the translated value of a key (or an array of keys) or the key if the value was not found
   * @memberof LocalizationService
   */
  getTranslate(
    key: string | Array<string>,
    interpolateParams?: Object
  ): Observable<string | Object> {
    return this.translate.get(key, interpolateParams);
  }

  /**
   * Gets the translated value of a key
   *
   * @param {string} key
   * @param {Object} [interpolateParams]
   * @return {string}  Gets the translated value of a key
   * @memberof LocalizationService
   */
  instant(key: string, interpolateParams?: Object): string {
    return this.translate.instant(key, interpolateParams);
  }
}
