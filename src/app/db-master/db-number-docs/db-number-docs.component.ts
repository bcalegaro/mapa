import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { DBService, DocHeader, DocInfo } from "@shared/db.service";
import { NumberService } from "@shared/number.service";

declare var $: any;

@Component({
  selector: "app-db-number-docs",
  templateUrl: "./db-number-docs.component.html",
  styleUrls: ["./db-number-docs.component.scss"]
})
export class DbNumberDocsComponent implements OnInit, OnDestroy {
  // id to title
  public id: string;
  private idSubscription: any;

  // Two data biding doc
  public doc: DocHeader;
  // Two data biding for modal
  public numberInfo: DocInfo;
  // Flag to wait db ready
  public ready: boolean;

  constructor(
    private route: ActivatedRoute,
    private dbservice: DBService,
    private numberService: NumberService
  ) {
    this.ready = false;
  }

  ngOnInit() {
    // Initialize subscrition to target id
    this.idSubscription = this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    this.updateViewDoc();
  }

  ngOnDestroy() {
    // Unsubscribe target id
    this.idSubscription.unsubscribe();
  }

  updateViewDoc() {
    this.ready = false;
    // Get docs by id from database, when the promise return will update the page
    this.dbservice.getDoc(this.id).then(doc => {
      this.doc = doc;
      console.log(this.doc);
      this.ready = true;
    });
  }

  action(number: DocInfo) {
    // Open modal
    this.numberInfo = number;
    $("#myModal").modal();
  }

  getColor(number) {
    // this.numberService.getColorFromNumber(number);
  }
}
