import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JokeBoxComponent } from './moraleassistant/joke-box/joke-box.component';
import { SoundBarComponent } from './moraleassistant/sound-bar/sound-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './common/material/material.module';
import { CommonModule } from './common/common.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MoraleAssistantModule } from './moraleassistant/morale-assistant.module';
import { AppRoutingModule } from './app-routing.module';

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
    CommonModule,
    MoraleAssistantModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
