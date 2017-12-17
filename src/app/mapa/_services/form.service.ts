import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms/src/model';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

@Injectable()
export class FormService {

  constructor(private router: Router) {
    console.log('form service works');
  }

  goToResume() {
    this.router.navigate(["/mapa/resume"]);
  }

  // Function to return true for valid date
  validateDate(value: string): boolean {
    if ((value.length < 8) || (value.length > 8)) {
      return false;
    }
    const day = value.charAt(0) + value.charAt(1);
    const month = value.charAt(2) + value.charAt(3);
    const year = value.substring(4, value.length)
    const date = moment(year + '-' + month + '-' + day);
    return date.isValid();
  }

  dateValidator(control: FormControl): ValidationErrors {
    if (control.value === "") {
      return { "invalidDate": true };
    }
    const value = control.value;
    if ((value.length < 8) || (value.length > 8)) {
      return { "invalidDate": true };
    }
    const day = value.charAt(0) + value.charAt(1);
    const month = value.charAt(2) + value.charAt(3);
    const year = value.substring(4, value.length)
    const date = moment(year + '-' + month + '-' + day);
    if (date.isValid()) {
      return  null;
    } else {
      return { "invalidDate": true };

    }
  }

}
