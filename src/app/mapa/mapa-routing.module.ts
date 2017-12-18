import { ResumeComponent } from './resume/resume.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from 'app/mapa/form/form.component';
import { ReportComponent } from 'app/mapa/report/report.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "form",
    pathMatch: "full"
  },
  {
    path: "form",
    component: FormComponent,
    data: {
      labels: ["Mapa Numerológico", "Formúlario"],
      urls: ["dashboard", "mapa/form"]
    }
  },
  {
    path: "resume",
    component: ResumeComponent,
    data: {
      labels: ["Mapa Numerológico", "Formulário", "Resumo"],
      urls: ["dashboard", "mapa/form", "mapa/resume"]
    }
  },
  {
    path: "report",
    component: ReportComponent,
    data: {
      labels: ["Mapa Numerológico", "Formulário", "Resumo", "Relatório"],
      urls: ["dashboard", "mapa/form", "mapa/resume", "mapa/report"]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaRoutingModule { }
