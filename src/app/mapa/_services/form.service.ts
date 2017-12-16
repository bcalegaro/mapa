import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  constructor(private router: Router) {
    console.log('form service works');
  }

  goToResume() {
    this.router.navigate(["/mapa/resume"]);
  }

}
