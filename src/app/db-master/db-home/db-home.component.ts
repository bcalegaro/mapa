import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DBService } from 'app/_shared/db.service';

@Component({
  selector: 'app-db-home',
  templateUrl: './db-home.component.html',
  styleUrls: ['./db-home.component.scss']
})
export class DbHomeComponent implements OnInit {

  constructor(public dbservice:  DBService, public router: Router) { }

  ngOnInit() {
  }

  addTodo() {
    this.dbservice.addTodo('t');
  }

  showTodos() {
    this.dbservice.showTodos();
  }

  addAlma() {
    this.dbservice.addAlma();
  }

  addAparencia() {
    this.dbservice.updateDoc("Aparencia", []);
  }

  addDestino() {
    this.dbservice.updateDoc("Destino", []);
  }

  goToNumberDoc(doc: string) {
    this.router.navigate(['/db-master/db-numbers-docs', doc]);
  }
}
