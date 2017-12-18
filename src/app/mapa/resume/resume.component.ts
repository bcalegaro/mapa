import { ReportService } from './../_services/report.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocHeader } from '@shared/db.service';
import { DBService, DocInfo } from '@shared/db.service';
import { NumberService } from '@shared/number.service';
import { CoreService, MapaData } from 'app/mapa/_services/core.service';

declare var $: any;

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  // Data (all numbers calculated and user info)
  data: MapaData;

  // Database docs
  almaDocs: DocHeader;
  almaIndex: number;
  aparenciaDocs: DocHeader;
  aparenciaIndex: number;
  destinoDocs: DocHeader;
  destinoIndex: number;

  // Two data biding for modal
  numberInfo: DocInfo;
  selectedDoc: string;

  // Flag for loading spinner fetching data from database will decrease by doc
  loading = 3;

  constructor(
    private router: Router,
    private coreService: CoreService,
    private dbService: DBService,
    private numberService: NumberService,
    private reportService: ReportService) {
    // Blank info to avoid modal error
    this.numberInfo = {
      number: {
        original: 0,
        textual: "",
        value: 0,
        color: ""
      },
      description: ""
    };
  }

  ngOnInit() {
    this.coreService.setFullName('Bruno Crestani Calegaro');
    this.coreService.setBirthday('21091988');
    // Live reload already updated full name and birthday so only set sex and email
    this.coreService.setSex('Masculino');
    this.coreService.setEmail('a@a.com');
    this.data = this.coreService.getData();

    this.getDocs();
  }

  getDocs() {
    this.getDocFromId('Alma');
    this.getDocFromId('Aparência');
    this.getDocFromId('Destino');
  }

  getDocFromId(id: string) {
    // Get doc from DB
    this.dbService.getDoc(id).then((doc) => {
      this.setDocFromId(id, doc);
      this.setIndexFromId(id);
      const index = this.getDocIndexSelected(id);
      // New document, must create a blank one
      if (index === -1) {
        // Create the new number info to save in database
        this.numberInfo = {
          number: this.numberService.getNumberMapa(this.getDocOriginalValue(id)),
          description: "Nùmero inexistente. Você precisa editar esse campo antes de gerar o relatório."
        };
        const olddoc = this.getDocSelected(id);
        olddoc.docs.push(this.numberInfo);
        olddoc.docs = olddoc.docs.sort(function (a: DocInfo, b: DocInfo) {
          // Order ascending by original number EX: 1, 3, 11, 77, 99, ...
          return a.number.original - b.number.original;
        });
        this.dbService.updateDoc(id, olddoc.docs);
        this.setIndexFromId(id);
        //        this.almaIndex = this.dbService.getDocInfoPosition(this.almaDocs, this.data.alma);
      }
      this.loading--;
    });
  }

  // Trigger this action edit number info - has to discover which card invocated it
  action(selectedDoc: string, selectedIndex: number) {
    // Must save which doc should alter
    this.selectedDoc = selectedDoc;
    // Get doc selected
    const doc = this.getDocSelected(selectedDoc);
    // Open modal with updated values
    this.numberInfo = {
      number: {
        original: doc.docs[selectedIndex].number.original,
        textual: doc.docs[selectedIndex].number.textual,
        value: doc.docs[selectedIndex].number.value,
        color: doc.docs[selectedIndex].number.color
      },
      description: doc.docs[selectedIndex].description
    };
    $("#myModal").modal();
  }

  // Assing parameters doc do correct id
  setDocFromId(id: string, doc: DocHeader) {
    switch (id) {
      case "Alma":
        this.almaDocs = doc;
        break;
      case "Aparência":
        this.aparenciaDocs = doc;
        break; case "Destino":
        this.destinoDocs = doc;
        break;
      default:
        alert('error');
        break;
    }
  }

  // Update index of doc id
  setIndexFromId(id: string) {
    switch (id) {
      case "Alma":
        this.almaIndex = this.dbService.getDocInfoPosition(this.almaDocs, this.data.alma);
        break;
      case "Aparência":
        this.aparenciaIndex = this.dbService.getDocInfoPosition(this.aparenciaDocs, this.data.aparencia);
        break;

      case "Destino":
        this.destinoIndex = this.dbService.getDocInfoPosition(this.destinoDocs, this.data.destino);
        break;
      default:
        alert('error');
        break;
    }
  }

  // Simple return doc of selected number type
  getDocSelected(id: string): DocHeader {
    let doc: DocHeader;
    switch (id) {
      case "Alma":
        doc = this.almaDocs;
        break;
      case "Aparência":
        doc = this.aparenciaDocs;
        break;
      case "Destino":
        doc = this.destinoDocs;
        break;
      default:
        alert('error');
        break;
    }
    return doc;
  }

  // Simple return index of selected number type
  getDocIndexSelected(id: string): number {
    let index: number;
    switch (id) {
      case "Alma":
        index = this.almaIndex;
        break;
      case "Aparência":
        index = this.aparenciaIndex;
        break;
      case "Destino":
        index = this.destinoIndex;
        break;
      default:
        alert('error');
        break;
    }
    return index;
  }

  // Simple return raw value of selected number type
  getDocOriginalValue(id: string): number {
    let index: number;
    switch (id) {
      case "Alma":
        index = this.data.alma;
        break;
      case "Aparência":
        index = this.data.aparencia;
        break;
      case "Destino":
        index = this.data.destino;
        break;
      default:
        alert('error');
        break;
    }
    return index;
  }

  saveDoc() {
    // Activated loading spinner
    this.loading++;
    // Discover what do change
    const doc = this.getDocSelected(this.selectedDoc);
    const index = this.getDocIndexSelected(this.selectedDoc);
    // Change and order
    doc.docs[index] = this.numberInfo;
    doc.docs = doc.docs.sort(function (a: DocInfo, b: DocInfo) {
      // Order ascending by original number EX: 1, 3, 11, 77, 99, ...
      return a.number.original - b.number.original;
    });
    // Update database
    this.dbService.updateDoc(this.selectedDoc, doc.docs);
    // Discover new index - reorder can change index...
    this.dbService.getDocInfoPosition(doc, this.getDocOriginalValue(this.selectedDoc));
    // Deactivated spinner
    this.loading--;
  }

  createReport() {
    this.coreService.setReportInfo(this.almaDocs.docs[this.almaIndex], this.aparenciaDocs.docs[this.aparenciaIndex], this.destinoDocs.docs[this.destinoIndex]);
    this.data = this.coreService.getData();
    this.reportService.createAndSaveReport(this.data);
  }
}
