import { NgModule } from '@angular/core';
import { JokeBoxComponent } from './joke-box/joke-box.component';
import { SoundBarComponent } from './sound-bar/sound-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JokeService } from '../common/service/joke.service';
import { MaterialModule } from '../common/material/material.module';
import { CommonModule } from '../common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        JokeBoxComponent,
        SoundBarComponent,
        HomePageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        RouterModule,

        MaterialModule,
        CommonModule,
    ],
    exports: [
        HomePageComponent
    ],
    providers: [
        JokeService
    ]
})
export class MoraleAssistantModule { }