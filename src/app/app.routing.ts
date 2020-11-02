import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleComponent } from './vehicle-list/vehicle/vehicle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicle-list',
    pathMatch: 'full',
  },
  { path: 'vehicle-list', component: VehicleListComponent },
  { path: 'vehicle-list/:id', component: VehicleComponent },
];


export const AdminLayoutRoutes: Routes = [

];



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
