import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';

/**
 * Custom translation loader (ready for AOT)
 * @param http Angular core HTTP
 */
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }
  })]
})
export class TranslationModule { }
