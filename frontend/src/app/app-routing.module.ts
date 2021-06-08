import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndeedComponent} from './indeed/indeed.component';

const routes: Routes = [
  {path:'indeed', component:IndeedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
