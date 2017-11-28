import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbMasterRoutingModule } from './db-master-routing.module';
import { DbHomeComponent } from './db-home/db-home.component';
import { SharedModule } from 'app/_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DbMasterRoutingModule
  ],
  declarations: [DbHomeComponent]
})
export class DbMasterModule { }
