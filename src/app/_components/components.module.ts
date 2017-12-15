import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CardAwesomeComponent } from './card-awesome/card-awesome.component';
import { FroalaViewModule } from 'angular-froala-wysiwyg/view/view.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FroalaViewModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    CardAwesomeComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CardAwesomeComponent
  ]
})
export class ComponentsModule { }
