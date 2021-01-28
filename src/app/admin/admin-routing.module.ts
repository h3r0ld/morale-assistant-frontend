import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../common/component/page-not-found/page-not-found.component';
import { JokeManagementPageComponent } from './joke-management-page/joke-management-page.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: 'jokes', component: JokeManagementPageComponent },
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
