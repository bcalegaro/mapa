import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {
  data: MapaData;

  constructor() {
    // Create a blank information
    this.data = new MapaData('', '', '');
  }

  getData(): MapaData {
    return this.data;
  }

  // Simple set methods
  setData(fullname: string,
    birthday: string,
    email: string) {
    this.data.fullname = fullname;
    this.data.birthday = birthday;
    this.data.email = email;
  }
  setFullName(fullname: string) {
    // Set full name data and update mapa numbers
    this.data.fullname = fullname;
    this.processFullName();
  }
  setBirthday(birthday: string) {
    this.data.birthday = birthday;
  }
  setEmail(email: string) {
    this.data.email = email;
  }

  // Function to process mapa from full name
  private processFullName() {
    const name = this.data.fullname.toLowerCase().split('');
    let alma = 0, aparencia = 0, destino;
    // Process logic run each letter, get its raw value and sum number correctly
    let value: number;
    for (const i of name) {
      if (i !== " ") { // To ignore white space
        value = this.getAlphabeticNumber(i);
        // Vogals firsts, else cons
        if ((i === 'a') || (i === 'e') || (i === 'i') || (i === 'o') || (i === 'u')) {
          alma += value;
        } else {
          aparencia += value;
        }
      }
    }
    destino = alma + aparencia;
    this.data.setNameData(alma, aparencia, destino);
  }

  // Function to get the given number of a letter (Works for lowercase only)
  private getAlphabeticNumber(char: string) {
    return (char.charCodeAt(0) - 97) % 9 + 1;
  }


}

// Model Class
export class MapaData {
  // User info
  fullname: string;
  birthday: string;
  email: string;

  // Mapa number
  alma: number;
  aparencia: number;
  destino: number;
  licaodevida: number;

  constructor(fullname: string,
    birthday: string,
    email: string) {
    this.fullname = fullname;
    this.birthday = birthday;
    this.email = email;
  }

  setNameData(alma: number, aparencia: number, destino: number) {
    this.alma = alma;
    this.aparencia = aparencia;
    this.destino = destino;
  }
}