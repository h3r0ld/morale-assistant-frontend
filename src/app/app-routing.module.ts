import { JokeBoxComponent } from './moraleassistant/joke-box/joke-box.component';
import { HomePageComponent } from './moraleassistant/home-page/home-page.component';
import { HomePageComponent as AdminHomePage } from './admin/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './common/guards/auth.guard';
import { LoginPageComponent } from './admin/login-page/login-page.component';

const routes: Routes = [
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: 'jokebox', component: JokeBoxComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'admin', component: AdminHomePage, canActivate: [AuthGuard], loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule) },
    
    // Redirect to home
    { path: '**', redirectTo: '' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
