import { NgModule } from '@angular/core';
import { JokeManagementPageComponent } from './joke-management-page/joke-management-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../common/material/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MoraleAssistantCommonModule } from '../common/moraleassistant-common.module';
import { CommonModule } from '@angular/common';
import { JokeEditDialogComponent } from './joke-edit-dialog/joke-edit-dialog.component';

@NgModule({
    declarations: [
        JokeManagementPageComponent,
        HomePageComponent,
        JokeEditDialogComponent,
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
    entryComponents: [
        JokeEditDialogComponent,
    ],
    providers: []
})
export class AdminModule { }
