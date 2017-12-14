import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-awesome',
  templateUrl: './card-awesome.component.html',
  styleUrls: ['./card-awesome.component.scss']
})
export class CardAwesomeComponent implements OnInit {
  @Input() title;
  @Input() description;
  @Input() color;

  @Input() btnText;
  @Input() btnAction;
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  dodo() {
    this.change.emit(this.btnAction);
  }

}
