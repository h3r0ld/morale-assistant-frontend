import { NgModule } from '@angular/core';
import { JokeBoxComponent } from './joke-box/joke-box.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MaterialModule } from '../common/material/material.module';
import { MoraleAssistantCommonModule } from '../common/moraleassistant-common.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        JokeBoxComponent,
        HomePageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        RouterModule,
        CommonModule,

        MaterialModule,
        MoraleAssistantCommonModule,
    ],
    exports: [
        HomePageComponent
    ]
})
export class MoraleAssistantModule { }