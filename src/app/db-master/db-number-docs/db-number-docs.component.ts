import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { DBService, DocHeader, DocInfo } from "@shared/db.service";
import { NumberService, NumberMapa } from "@shared/number.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

declare var $: any;

@Component({
  selector: "app-db-number-docs",
  templateUrl: "./db-number-docs.component.html",
  styleUrls: ["./db-number-docs.component.scss"]
})
export class DbNumberDocsComponent implements OnInit, OnDestroy {
  // id to title
  id: string;
  idSubscription: any;

  // Two data biding doc
  doc: DocHeader;
  // Two data biding for modal
  numberInfo: DocInfo;
  numberIndex: number;
  // Flag to wait db ready
  ready: boolean;
  // Flag to add or cancel db insert
  isNewDoc: boolean;

  // Froala options
  options: Object;

  // Form settings
  showForm: boolean;
  addNumberForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dbservice: DBService,
    private numberService: NumberService,
    private fb: FormBuilder
  ) {
    this.ready = false;
    // Give blank info to modal
    this.numberInfo = {
      number: {
        original: 0,
        textual: "",
        value: 0,
        color: ""
      },
      description: ""
    };
    // Set froala options
    this.options = {
      charCounterCount: false,
      imageEditButtons: []
    };
    // Set form configurations
    this.showForm = false;
    this.addNumberForm = fb.group({
      numberInput: ["", Validators.required]
    });
    // Set initial flag
    this.isNewDoc = false;
  }

  ngOnInit() {
    // Initialize subscrition to target id
    this.idSubscription = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    // Update screen
    this.updateViewDoc();
  }

  ngOnDestroy() {
    // Unsubscribe target id
    this.idSubscription.unsubscribe();
  }

  updateViewDoc() {
    // Flag to avoid erros rendering
    this.ready = false;
    // Get docs by id from database, when the promise return will update the page
    this.dbservice.getDoc(this.id).then(doc => {
      this.doc = doc;
      this.ready = true;
    });
  }

  action(index: number) {
    // Open modal
    this.numberIndex = index;
    this.numberInfo = {
      number: {
        original: this.doc.docs[index].number.original,
        textual: this.doc.docs[index].number.textual,
        value: this.doc.docs[index].number.value,
        color: this.doc.docs[index].number.color
      },
      description: this.doc.docs[index].description
    };
    $("#myModal").modal();
  }

  saveDoc() {
    // Check flag for update
    if (!this.isNewDoc) {
      this.doc.docs[this.numberIndex] = this.numberInfo;
    } else {
      // Will be here only for flag new
      // Add new number and sort document
      this.doc.docs.push(this.numberInfo);
      this.doc.docs = this.doc.docs.sort(function(a: DocInfo, b: DocInfo) {
        // Order ascending by original number EX: 1, 3, 11, 77, 99, ...
        return a.number.original - b.number.original;
      });
      // Remove flag
      this.isNewDoc = false;
    }
    this.dbservice.updateDoc(this.id, this.doc.docs);
  }

  toogleForm() {
    this.showForm = !this.showForm;
  }

  addNumber() {
    // Get UI value
    const number: number = +this.addNumberForm.controls["numberInput"].value;
    if (this.addNumberForm.controls["numberInput"].invalid) {
      alert("Você precisa preenchar o campo primeiro! Insira um número");
      return;
    } else if (number < 1 && number > 250) {
      alert("Erro! Você inseriu um número inválido. Tente novamente");
    }
    // Create new numberInfo object
    this.numberInfo = {
      number: this.numberService.getNumberMapa(number),
      description: JSON.stringify(this.numberService.getNumberMapa(number))
    };
    // Set flag for modal save logic
    this.isNewDoc = true;
    // UI actions
    this.addNumberForm.reset();
    this.toogleForm();
    $("#myModal").modal();
  }
}
