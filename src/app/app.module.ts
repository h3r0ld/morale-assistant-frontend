import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './common/material/material.module';
import { MoraleAssistantCommonModule } from './common/moraleassistant-common.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MoraleAssistantModule } from './moraleassistant/morale-assistant.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PublicApiModule } from './common/client/public/api.module';
import { AdminApiModule, AdminConfiguration } from './common/client/admin';
import { PublicConfiguration } from './common/client/public/configuration';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,

    MaterialModule,
    MoraleAssistantCommonModule,
    MoraleAssistantModule,
    AdminModule,
    ToastrModule.forRoot(),
    PublicApiModule.forRoot(() => {
      return new PublicConfiguration({
        basePath: environment.apiUrl
      });
    }),
    AdminApiModule.forRoot(() => {
      return new AdminConfiguration({
        basePath: environment.apiUrl
      });
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
