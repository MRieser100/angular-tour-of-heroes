import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // 'full' => whole URL path needs to match VS 'prefix' => first route that matches is chosen
  { path: 'heroes', component: HeroesComponent }, // => localhost:4200/heroes
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }
]

@NgModule({
  // configure router at app's root level - supplying service providers, directives(ex: <router-outlet>), & initial nav
  imports: [ RouterModule.forRoot(routes) ], 
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
