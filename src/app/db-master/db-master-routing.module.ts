import { DbHomeComponent } from "./db-home/db-home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: DbHomeComponent,
    data: {
      title: "Que bosta"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbMasterRoutingModule {}
