import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { ElectronService } from './core/providers/electron.service';
import { BrowserHelper } from './shared/helpers/browser.helper';
import { NotificationSidebarComponent } from './core/components/notification-sidebar/notification-sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService) {

    translate.setDefaultLang('en');

    if (electronService.isElectron()) {
      moment.locale(this.electronService.remote.app.getLocale());
    } else {
      moment.locale(BrowserHelper.getBrowserLang());
    }
  }
}
