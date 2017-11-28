import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbMasterRoutingModule } from './db-master-routing.module';
import { DbHomeComponent } from './db-home/db-home.component';

@NgModule({
  imports: [
    CommonModule,
    DbMasterRoutingModule
  ],
  declarations: [DbHomeComponent]
})
export class DbMasterModule { }
