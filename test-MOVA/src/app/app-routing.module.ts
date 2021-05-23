import { DomMenuComponent } from './dom-menu/dom-menu.component';
import { DomDetailsComponent } from './dom-details/dom-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/menu/1', pathMatch: 'full'},
  { path: 'menu/:id', component: DomMenuComponent},
  {path: 'details/:name', component: DomDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
