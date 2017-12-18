import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxMaskModule } from 'ngx-mask';

import { ChartService } from './_services/chart.service';
import { CoreService } from './_services/core.service';
import { FormService } from './_services/form.service';
import { ReportService } from './_services/report.service';
import { FormComponent } from './form/form.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { ResumeComponent } from './resume/resume.component';

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
  providers: [FormService, CoreService, ChartService, ReportService]
})
export class MapaModule { }
