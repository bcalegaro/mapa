import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

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
  providers: [FormService]
})
export class MapaModule { }
