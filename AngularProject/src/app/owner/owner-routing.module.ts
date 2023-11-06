import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { OwnerListComponent } from './owner-list/owner-list.component';

const routes: Routes = [{ path: 'list', component: OwnerListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {}
