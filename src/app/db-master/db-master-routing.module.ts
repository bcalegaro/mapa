import { DbNumberDocsComponent } from "./db-number-docs/db-number-docs.component";
import { DbHomeComponent } from "./db-home/db-home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "db-home",
    pathMatch: "full"
  },
  {
    path: "db-home",
    component: DbHomeComponent,
    data: {
      labels: ["Arquivos"],
      urls: ["db-master/db-home"]
    }
  },
  {
    path: "db-numbers-docs/:id",
    component: DbNumberDocsComponent,
    data: {
      labels: ["Arquivos", "Visualizar Número"],
      urls: ["db-master/db-home", "db-master/db-numbers-docs"]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbMasterRoutingModule {}
