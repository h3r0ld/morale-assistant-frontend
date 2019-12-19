import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule} from '@angular/material/button'
import { JokeBoxComponent } from './moraleassistant/joke-box/joke-box.component';
import { SoundBarComponent } from './moraleassistant/sound-bar/sound-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    JokeBoxComponent,
    SoundBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
