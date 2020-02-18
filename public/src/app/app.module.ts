import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { SharingService } from './services/sharing.service';
import { ApiConnectorService } from './services/api-connector.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  	SharingService,
    ApiConnectorService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
