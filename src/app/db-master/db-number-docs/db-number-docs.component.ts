import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { DBService, DocHeader } from 'app/_shared/db.service';


@Component({
  selector: 'app-db-number-docs',
  templateUrl: './db-number-docs.component.html',
  styleUrls: ['./db-number-docs.component.scss']
})
export class DbNumberDocsComponent implements OnInit, OnDestroy {
  public id: string;
  private idSubscription: any;

  public doc: DocHeader;

  constructor(private route: ActivatedRoute, private dbservice: DBService) { }

  ngOnInit() {
    // Initialize subscrition to target id
    this.idSubscription = this.route.params.subscribe( params => {
      this.id = params['id'];
    });

    this.updateViewDoc();
  }

  ngOnDestroy() {
    // Unsubscribe target id
    this.idSubscription.unsubscribe();
  }

  updateViewDoc() {
    // Get docs by id from database, when the promise return will update the page
    this.dbservice.getDoc(this.id).then( doc => {
      this.doc = doc;
      console.log(this.doc);
    });
  }

}
