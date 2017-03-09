import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Modules
import { SharedModule } from './shared/shared.module';
import { TranslationModule } from './app.translation';

// Feature modules
import { DashboardModule } from './dashboard/dashboard.module';

// Routing
import { AppRoutingModule } from './app.router';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    TranslationModule,
    DashboardModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
