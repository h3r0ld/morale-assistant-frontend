import { JokeBoxComponent } from "./moraleassistant/joke-box/joke-box.component";
import { HomePageComponent } from './moraleassistant/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './common/component/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'home/jokes', component: JokeBoxComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }