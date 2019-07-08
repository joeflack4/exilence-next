import { NgModule } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { SharedModule } from '../shared/shared.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { HeaderPageComponent } from './containers/header-page/header-page.component';
import { NotificationSidebarPageComponent } from './containers/notification-sidebar-page/notification-sidebar-page.component';
import { CookieService } from './providers/cookie.service';
import { ExternalService } from './providers/external.service';
import { GroupService } from './providers/group.service';
import { JsonService } from './providers/json.service';
import { SessionService } from './providers/session.service';
import { SignalrService } from './providers/signalr.service';


@NgModule({
  imports: [SharedModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    NgPipesModule
  ],
  declarations: [HeaderPageComponent, NotificationSidebarPageComponent, NotificationListComponent],
  exports: [HeaderPageComponent, NotificationSidebarPageComponent, NotificationListComponent],
  providers: [CookieService, SessionService, ExternalService, JsonService, SignalrService, GroupService]
})

export class CoreModule { }
