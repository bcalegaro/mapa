import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { ChartService } from './_services/chart.service';
import { CoreService } from './_services/core.service';
import { FormService } from './_services/form.service';
import { FormComponent } from './form/form.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { ResumeComponent } from './resume/resume.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg/editor/editor.module';
import { FroalaViewModule } from 'angular-froala-wysiwyg/view/view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    ComponentsModule,
    SharedModule,
    FroalaEditorModule,
    FroalaViewModule,
    MapaRoutingModule
  ],
  declarations: [FormComponent, ResumeComponent],
  providers: [FormService, CoreService, ChartService]
})
export class MapaModule { }
