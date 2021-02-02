import { Routes, RouterModule } from '@angular/router';
import { JokeManagementPageComponent } from './joke-management-page/joke-management-page.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from '../common/guards/auth.guard';

const routes: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'jokes', component: JokeManagementPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent },
    
    // Redirect to home
    { path: '**', redirectTo: '' },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
