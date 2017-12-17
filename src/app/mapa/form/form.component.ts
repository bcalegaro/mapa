import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class FormComponent implements OnInit, OnDestroy {
  // Mapa form group
  mapaForm: FormGroup;
  // Flag to show pre-resume
  showPreResume: boolean;

  // Pre-Resume data
  mapaData: MapaData;

  // Subscriber to live reload
  fullNameSubscription: any;
  birthdaySubscription: any;

  constructor(
    private router: Router,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private numberService: NumberService,
    private coreService: CoreService,
    private chartService: ChartService
  ) {
    this.mapaForm = this.formBuilder.group({
      'fullName': ['Bruno Crestani Calegaro', Validators.required],
      'email': ['a@a.com', Validators.email],
      'birthday': ['21091988', Validators.compose([
        Validators.required, Validators.minLength(8),
        this.formService.dateValidator
      ])],
      'sex': ['M', Validators.required]
    });
  }

  ngOnInit() {
    // Set initial flags
    this.showPreResume = false;
    this.mapaData = new MapaData('', '', '', '');
    // Create chart blank
    const canvas = document.getElementById("myChart");
    this.chartService.createChart(canvas);

    // Subscribe to from fullName - live reload chart and pre-resume
    this.fullNameSubscription = this.mapaForm.controls['fullName'].valueChanges.subscribe((newValue) => {
      if (this.mapaForm.controls['fullName'].valid) {
        this.coreService.setFullName(newValue);
        this.mapaData = this.coreService.getData();
        this.chartService.updateChartFromData(this.coreService.getDataForChart());
        this.showPreResume = true;
      }
    });

    this.birthdaySubscription = this.mapaForm.controls['birthday'].valueChanges.subscribe((newValue) => {
      if (this.mapaForm.controls['birthday'].valid) {
        this.coreService.setBirthday(newValue);
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe target id
    this.fullNameSubscription.unsubscribe();
    this.birthdaySubscription.unsubscribe();
  }

  goToResume() {
    this.formService.goToResume();
  }

  // Angular reset the form but this reset variables
  reset() {
    this.showPreResume = false;
    this.coreService.resetData();
    this.mapaData = new MapaData('', '', '', '');
    this.chartService.updateChartFromData(this.coreService.getDataForChart());
  }

  onSubmit() {
    this.coreService.setFullName(this.mapaForm.controls['fullName'].value);
    this.coreService.setBirthday(this.mapaForm.controls['birthday'].value);
    // Live reload already updated full name and birthday so only set sex and email
    this.coreService.setSex(this.mapaForm.controls['sex'].value);
    this.coreService.setEmail(this.mapaForm.controls['email'].value);
    // No need to pass parameters because core service persistence the form data
    this.formService.goToResume();
  }

}
