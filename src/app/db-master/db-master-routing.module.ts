import { DbNumberDocsComponent } from "./db-number-docs/db-number-docs.component";
import { DbHomeComponent } from "./db-home/db-home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'db-home',
    pathMatch: 'full'
  },
  {
    path: 'db-home',
    component: DbHomeComponent
  },
  {
    path: "db-numbers-docs/:id",
    component: DbNumberDocsComponent,
    data: {
      title: "DB Number Docs"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbMasterRoutingModule {}
