import { NgModule } from '@angular/core';
import { JokeManagementPageComponent } from './joke-management-page/joke-management-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../common/material/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MoraleAssistantCommonModule } from '../common/moraleassistant-common.module';
import { CommonModule } from '@angular/common';
import { JokeEditDialogComponent } from './joke-edit-dialog/joke-edit-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
    declarations: [
        JokeManagementPageComponent,
        HomePageComponent,
        JokeEditDialogComponent,
        LoginPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        MoraleAssistantCommonModule,
        AdminRoutingModule,
    ],
    exports: [
        JokeManagementPageComponent,
    ],
    providers: []
})
export class AdminModule { }
