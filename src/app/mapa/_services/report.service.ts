import { Injectable } from '@angular/core';
import { CoreService, MapaData } from 'app/mapa/_services/core.service';
import * as Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as moment from 'moment';
import { unescape } from 'querystring';

declare var Encoder: any;
declare var $: any;

@Injectable()
export class ReportService {

  constructor(private coreService: CoreService) { }

  private createReportData(data: MapaData) {
    const splitedInfo = this.coreService.getSplitedNameNumber(data.fullname);
    const birthdayDate = this.coreService.getBirthDayDate();
    const reportData = {
      nomeCompleto: data.fullname,
      dataNascimento: birthdayDate,
      agora: moment().toString(),
      nomeQuebrado: splitedInfo[0],
      numerosQuebrado: splitedInfo[1],
      numeroAlma: data.alma,
      numeroAlmaDescricao: this.converText(data.reportData.alma.description),
      numeroAparencia: data.aparencia,
      numeroAparenciaDescricao: this.converText(data.reportData.aparencia.description),
      numeroDestino: data.destino,
      numeroDestinoDescricao: this.converText(data.reportData.destino.description)
    }
    return reportData;
  }

  createAndSaveReport(mapaData: MapaData) {
    // Prepare data to parse in template report
    const data = this.createReportData(mapaData);
    // Process template report with data and error tratement
    this.loadFile("assets/report/mapa-report-base.docx", function (error, content) {
      if (error) { throw error };
      const zip = new JSZip(content);
      const doc = new Docxtemplater().loadZip(zip)
      doc.setData(data);

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
      } catch (error) {
        const e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        }
        console.log(JSON.stringify({ error: e }));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
      }

      // If successed, save document and ask user where to
      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      saveAs(out, data.nomeCompleto + ".docx")
    })
  }

  loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
  }

  // This is the sample code from official docxtemplater website - will work for simple test
  createReportSample() {
    this.loadFile("assets/report/tag-example.docx", function (error, content) {
      if (error) { throw error };
      const zip = new JSZip(content);
      const doc = new Docxtemplater().loadZip(zip)
      doc.setData({
        first_name: 'John',
        last_name: 'Doe',
        phone: '0652455478',
        description: 'New Website'
      });

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
      } catch (error) {
        const e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        }
        console.log(JSON.stringify({ error: e }));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
      }

      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }) // Output the document using Data-URI
      saveAs(out, "output.docx");
      $("#reportButton").button('reset');
    })
  }

  converText(text: string) {
    // Convert html with plain text removing tags and special characters
    return Encoder.htmlDecode(text).replace(/<[^>]*>/g, '');
  }

}

