import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { MapaRoutingModule } from './mapa-routing.module';

// UI Components
import { FormComponent } from './form/form.component';
import { ResumeComponent } from './resume/resume.component';

// Business logic
import { FormService } from './_services/form.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MapaRoutingModule
  ],
  declarations: [FormComponent, ResumeComponent],
  providers: [FormService]
})
export class MapaModule { }
