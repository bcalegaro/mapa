import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { LoadChildren, RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TableListComponent } from "./table-list/table-list.component";
import { TypographyComponent } from "./typography/typography.component";
import { IconsComponent } from "./icons/icons.component";
import { MapsComponent } from "./maps/maps.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { UpgradeComponent } from "./upgrade/upgrade.component";

const routes: Routes = [
  {
    path: "db-master",
    data: {
      labels: ["Arquivos"],
      urls: ["db-master"]
    },
    loadChildren: "./db-master/db-master.module#DbMasterModule"
  },
  {
    path: "dashboard",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: DashboardComponent
  },
  {
    path: "user-profile",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: UserProfileComponent
  },
  {
    path: "table-list",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: TableListComponent
  },
  {
    path: "typography",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: TypographyComponent
  },
  {
    path: "icons",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: IconsComponent
  },
  {
    path: "maps",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: MapsComponent
  },
  {
    path: "notifications",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: NotificationsComponent
  },
  {
    path: "upgrade",
    data: {
      labels: ["Dashboard"],
      urls: ["dashboard"]
    },
    component: UpgradeComponent
  },
  { path: "", redirectTo: "db-master", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
