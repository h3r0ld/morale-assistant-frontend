import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JokeBoxComponent } from './moraleassistant/joke-box/joke-box.component';
import { SoundBarComponent } from './moraleassistant/sound-bar/sound-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './common/material/material.module';
import { CommonModule } from './common/common.module';
import { JokeService } from './common/service/joke.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    JokeBoxComponent,
    SoundBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

    MaterialModule,
    CommonModule
  ],
  providers: [JokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
