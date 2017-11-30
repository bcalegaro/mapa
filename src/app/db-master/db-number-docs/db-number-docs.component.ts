import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-db-number-docs',
  templateUrl: './db-number-docs.component.html',
  styleUrls: ['./db-number-docs.component.scss']
})
export class DbNumberDocsComponent implements OnInit, OnDestroy {
  public id: string;
  private idSubscription: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.idSubscription = this.route.params.subscribe( params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

}
