import { NgModule } from '@angular/core';
import { JokeManagementPageComponent } from './joke-management-page/joke-management-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../common/material/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MoraleAssistantCommonModule } from '../common/moraleassistant-common.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        JokeManagementPageComponent,
        HomePageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,

        MoraleAssistantCommonModule,
        AdminRoutingModule,
    ],
    exports: [
        JokeManagementPageComponent
    ],
    providers: []
})
export class AdminModule { }
