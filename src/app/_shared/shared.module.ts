import { ModuleWithComponentFactories, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumberService } from './number.service';
import { DBService } from './db.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DBService, NumberService]
    }
  }
 }
