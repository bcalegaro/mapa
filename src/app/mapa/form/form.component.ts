import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberService } from '@shared/number.service';
import { CoreService, MapaData } from 'app/mapa/_services/core.service';

import { ChartService } from './../_services/chart.service';
import { FormService } from './../_services/form.service';

// Business logic
// Angular forms
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  // Mapa form group
  mapaForm: FormGroup;
  // Flag to show pre-resume
  showPreResume: boolean;

  // Pre-Resume data
  mapaData: MapaData;

  constructor(
    private router: Router,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private numberService: NumberService,
    private coreService: CoreService,
    private chartService: ChartService
  ) {
    this.mapaForm = this.formBuilder.group({
      'fullName': ['', Validators.required],
      'email': ['', Validators.email],
      'birthday': ['', Validators.compose([
        Validators.required, Validators.minLength(8),
        this.formService.dateValidator
      ])]
    });
    // Set initial flag
    this.showPreResume = false;
    this.mapaData = new MapaData('', '', '');
  }

  ngOnInit() {
    this.coreService.setFullName('Bruno Crestani Calegaro');

    this.mapaData = this.coreService.getData();
    this.showPreResume = false;

    this.chartService.init();

    const canvas = document.getElementById("myChart");
    this.chartService.createChart(canvas);

  }

  goToResume() {
    this.formService.goToResume();
  }

  validateDate() {
//    this.coreService.setFullName(this.mapaForm.controls['fullName'].value);
    this.coreService.setFullName('Bruno Crestani Calegaro');

    this.mapaData = this.coreService.getData();
    this.showPreResume = true;



    // Send modified data and update the chart
    const indicesNumeros: Array<string> = ['1', '1', '1', '1', '1', '1', '1', '1', '1'];
    const valorNumeros: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const totalNumeros = 30;
    this.chartService.updateChart(indicesNumeros, valorNumeros, totalNumeros);
  }
}
