import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/_shared/db.service';

@Component({
  selector: 'app-db-home',
  templateUrl: './db-home.component.html',
  styleUrls: ['./db-home.component.scss']
})
export class DbHomeComponent implements OnInit {

  constructor(public dbservice:  DBService) { }

  ngOnInit() {
  }

}
