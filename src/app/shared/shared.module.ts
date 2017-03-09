import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// MDL Modules
import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { MdlPopoverModule } from '@angular2-mdl-ext/popover';
import { MdlExpansionPanelModule } from '@angular2-mdl-ext/expansion-panel';

// Services
import { HttpClient } from '../_services/http-client';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    TranslateModule,
    MdlModule,
    MdlSelectModule,
    MdlPopoverModule,
    MdlExpansionPanelModule
  ],
  providers: [ HttpClient ]
})
export class SharedModule { }
