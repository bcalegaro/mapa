import { Injectable } from '@angular/core';

@Injectable()
export class NumberService {

  constructor() { }

  getNumberMapa (number: number) {
    let textual = number.toString();
    while (number > 9) {
      let textualNumber = number.toString();
      number = 0;
      for (let c of textualNumber) {
        number += c;

      }
      console.log(number);
    }

  }

  getColorFromNumber(number) {
    this.getNumberMapa(number);

  }
}

export interface NumberMapa {
  original: number,
  textual: string,
  value: number,
  color: string
}
