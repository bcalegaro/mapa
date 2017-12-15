import { NumberMapa } from "./number.service";
import { Injectable } from "@angular/core";

@Injectable()
export class NumberService {
  constructor() {}

  // Returns a data type with:
  // original -> Original number EX: 1, 75, 37
  // textual -> textual representation of number. EX: 56 -> 56/11/2
  // value -> core values EX: 1, 2, 3, 4, 5, 6, 7, 8 and 9
  // color -> color of given value EX: 1 - red, 2 - ...
  getNumberMapa(number: number): NumberMapa {
    // Save initial values
    const originalNumber = number;
    let textual = number.toString();
    // Process calculations
    let i;
    while (number > 9) {
      const textualNumber = number.toString();
      let count = 0;
      for (i = 0; i < textualNumber.length; i++) {
        // Code syntax to add int and string
        count = count + +textualNumber.charAt(i);
      }
      number = count;
      textual = textual + "/" + number;
    }

    // Create object to return
    const numberMapa: NumberMapa = {
      original: originalNumber,
      textual: textual,
      value: number,
      color: this.getColorFromNumber(number)
    };
    return numberMapa;
  }

  getColorFromNumber(number: number): string {
    switch (number) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "green";
      case 5:
        return "blue-400"; // azul celeste
      case 6:
        return "indigo-600"; // azul anil ou próximo
      case 7:
        return "purple";
      case 8:
        return "pink";
      case 9:
        return "gold";
      default:
        return "error";
    }
  }
}

export interface NumberMapa {
  original: number;
  textual: string;
  value: number;
  color: string;
}
