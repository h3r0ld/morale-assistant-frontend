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
import { JokeImportDialogComponent } from './joke-import-dialog/joke-import-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

@NgModule({
    declarations: [
        JokeManagementPageComponent,
        HomePageComponent,
        JokeEditDialogComponent,
        LoginPageComponent,
        JokeImportDialogComponent,
        ChangePasswordDialogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        MoraleAssistantCommonModule,
        AdminRoutingModule,
        MatPasswordStrengthModule,
    ],
    exports: [
        JokeManagementPageComponent,
    ],
    providers: []
})
export class AdminModule { }
