import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbMasterRoutingModule } from './db-master-routing.module';
import { DbHomeComponent } from './db-home/db-home.component';
import { DbNumberDocsComponent } from './db-number-docs/db-number-docs.component';

import { SharedModule } from '@shared/shared.module';

import { ComponentsModule } from '@components/components.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    DbMasterRoutingModule
  ],
  declarations: [DbHomeComponent, DbNumberDocsComponent]
})
export class DbMasterModule { }
