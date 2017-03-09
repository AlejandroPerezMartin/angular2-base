import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService) {

    // TranslateService default configuration
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    // Set browser language as default
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

  }
}
