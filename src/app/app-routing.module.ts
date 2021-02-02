import { JokeBoxComponent } from './moraleassistant/joke-box/joke-box.component';
import { HomePageComponent } from './moraleassistant/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: 'jokebox', component: JokeBoxComponent },
    { path: 'admin', loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule) },
    
    // Redirect to home
    { path: '**', redirectTo: '' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
