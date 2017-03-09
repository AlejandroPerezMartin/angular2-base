import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard.router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
