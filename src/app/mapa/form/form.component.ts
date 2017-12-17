import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

// Business logic
import { FormService } from "./../_services/form.service";
// Angular forms
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  constructor(
    private router: Router,
    private formService: FormService,
    private formBuilder: FormBuilder
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

  }

  ngOnInit() { }

  goToResume() {
    this.formService.goToResume();
  }

  validateDate() {
    console.log(this.mapaForm.controls['birthday'].invalid);
  }
}
