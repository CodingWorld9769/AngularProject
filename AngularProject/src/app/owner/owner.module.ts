import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnerAccountComponent } from './owner-details/owner-account/owner-account.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OwnerListComponent,
    OwnerDetailsComponent,
    OwnerAccountComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule
  ]
})
export class OwnerModule { }
