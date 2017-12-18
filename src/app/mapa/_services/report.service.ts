import { Injectable } from '@angular/core';
import { CoreService, MapaData } from 'app/mapa/_services/core.service';
import * as Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as moment from 'moment';


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
      numeroAlmaDescricao: data.reportData.alma.description,
      numeroAparencia: data.aparencia,
      numeroAparenciaDescricao: data.reportData.aparencia.description,
      numeroDestino: data.destino,
      numeroDestinoDescricao: data.reportData.destino.description
    }
    return reportData;
  }

  createAndSaveReport(mapaData: MapaData) {
    const data = this.createReportData(mapaData);


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

      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }) // Output the document using Data-URI
      saveAs(out, data.nomeCompleto + ".docx")
    })
  }

  loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
  }

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
      saveAs(out, "output.docx")
    })
  }
}
