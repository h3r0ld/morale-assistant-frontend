import { Routes, RouterModule } from '@angular/router';
import { JokeManagementPageComponent } from './joke-management-page/joke-management-page.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../common/guards/auth.guard';

const routes: Routes = [
    { path: 'jokes', component: JokeManagementPageComponent, canActivate: [AuthGuard] },
    // Redirect to home
    { path: '**', redirectTo: '' },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
