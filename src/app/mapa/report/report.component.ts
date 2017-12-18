import { Component, OnInit } from '@angular/core';
import { CoreService, MapaData } from 'app/mapa/_services/core.service';

import { ReportService } from './../_services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  data: MapaData;

  finalReport;

  public options: Object = {
    charCounterCount: false
  }

  constructor(private coreService: CoreService, private reportService: ReportService) {
  }

  ngOnInit() {
    this.data = this.coreService.getData();
    this.finalReport = JSON.stringify(this.data.reportData);

  }

  createReport() {
    this.reportService.createAndSaveReport(this.data);
  }
  
  createReport2() {
    this.reportService.createReportSample();
  }



}
