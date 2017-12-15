import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DbMasterRoutingModule } from './db-master-routing.module';
import { DbHomeComponent } from './db-home/db-home.component';
import { DbNumberDocsComponent } from './db-number-docs/db-number-docs.component';

import { SharedModule } from '@shared/shared.module';

import { ComponentsModule } from '@components/components.module';

// FROALA - Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    FroalaEditorModule,
    FroalaViewModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    DbMasterRoutingModule
  ],
  declarations: [DbHomeComponent, DbNumberDocsComponent]
})
export class DbMasterModule { }
