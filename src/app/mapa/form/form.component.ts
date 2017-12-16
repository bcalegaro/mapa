import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormService } from './../_services/form.service';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  mapaForm: FormGroup;
test = true;
  constructor(
    private router: Router,
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {
    this.mapaForm = this.formBuilder.group({
      'fullName': ['', Validators.required],
      'email': ['',  Validators.email]
    });

  }

  test2() {
    this.test = !this.test;
alert(    this.mapaForm.controls['email'].dirty)
  }

  ngOnInit() {}

  goToResume() {
    this.formService.goToResume();
  }
}
