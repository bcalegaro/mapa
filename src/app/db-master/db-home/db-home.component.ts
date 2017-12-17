import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DBService } from "@shared/db.service";

@Component({
  selector: "app-db-home",
  templateUrl: "./db-home.component.html",
  styleUrls: ["./db-home.component.scss"]
})
export class DbHomeComponent implements OnInit {
  constructor(public dbservice: DBService, public router: Router) {}

  ngOnInit() {}

  addDocument(name: string) {
    this.dbservice.initDocument(name);
  }

  goToNumberDoc(doc: string) {
    this.router.navigate(["/db-master/db-numbers-docs", doc]);
  }

  action(event) {
    switch (event) {
      case "Alma":
      this.goToNumberDoc("Alma");
      break;
      case "Aparência":
      this.goToNumberDoc("Aparência");
      break;
      case "Destino":
      this.goToNumberDoc("Destino");
      break;
default:
        console.log(event);
        break;
    }
  }
}
