import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbMasterRoutingModule } from './db-master-routing.module';
import { DbHomeComponent } from './db-home/db-home.component';
import { SharedModule } from 'app/_shared/shared.module';
import { DbNumberDocsComponent } from './db-number-docs/db-number-docs.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DbMasterRoutingModule
  ],
  declarations: [DbHomeComponent, DbNumberDocsComponent]
})
export class DbMasterModule { }
