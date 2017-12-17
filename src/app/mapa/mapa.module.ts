import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { ChartService } from './_services/chart.service';
import { CoreService } from './_services/core.service';
import { FormService } from './_services/form.service';
import { FormComponent } from './form/form.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { ResumeComponent } from './resume/resume.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MapaRoutingModule
  ],
  declarations: [FormComponent, ResumeComponent],
  providers: [FormService, CoreService, ChartService]
})
export class MapaModule { }
