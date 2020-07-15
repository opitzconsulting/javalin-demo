import { NgModule } from '@angular/core';
import {TechnologyComponent} from './technology/technology.component';
import {RouterModule, Routes} from '@angular/router';
import {TECHNOLOGY_ROUTES} from './technology/technology-routing.module';


const routes: Routes = [
  { path: '', redirectTo: '/technology', pathMatch: 'full'},
  { path: 'technology', component: TechnologyComponent, children: TECHNOLOGY_ROUTES},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
