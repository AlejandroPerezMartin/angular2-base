import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.router';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { NotificationService } from '../_services/notification.service';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ChartsModule
  ],
  declarations: [
    FooterComponent,
    DashboardComponent,
    MainComponent,
    NotificationsComponent
  ],
  providers: [NotificationService]
})
export class DashboardModule { }
