import { Injectable } from "@angular/core";

import PouchDB from "pouchdb-browser";

// Number mapa custom type [original, textual, value]
import { NumberMapa } from './number.service';

@Injectable()
export class DBService {
  db: any;

  constructor() {
    console.log("DB Service created...");
    this.connect('projetomapa');
  }

  connect(document: string) {
    this.db = new PouchDB(document);
    const remote = "https://8662919f-e8d0-4227-8526-8c1a0f31b237-bluemix:5f43b9ac08a73bee3831fd0074364110038af114d8ee479d2953b4119de45a83@8662919f-e8d0-4227-8526-8c1a0f31b237-bluemix.cloudant.com/" + document;
    const remoteDB = new PouchDB(remote);
    return this.db
      .sync(remoteDB, {
        live: true,
        retry: true
      })
      .on("complete", function(change) {
        console.log("Local and remote databases synced");
      })
      .on("change", function(change) {
        console.log("Databases changed something");
      })
      .on("paused", function(info) {
        // replication was paused, usually because of a lost connection
      })
      .on("active", function(info) {
        // replication was resumed
      })
      .on("error", function(err) {
        console.log("Database got an error:" + err);
      });
  }

  addTodo(text) {
    const todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    };
    this.db.put(todo, function callback(err, result) {
      if (!err) {
        console.log("Successfully posted a todo!");
      }
    });
  }

  showTodos() {
    this.db.allDocs({ include_docs: true, descending: true }, function(
      err,
      doc
    ) {
      doc.rows.forEach(element => {
        console.log(element.doc.title);
      });
    });
  }

  updateDoc(id: string, info: Array<DocInfo>) {
    // Define target doc to update
    const doc: DocHeader = {
      _id: id,
      docs: info
    };
    // Connect to the database do update or create the given document
    this.db
      .get(id)
      .catch(err => {
        if (err.name === "not_found") {
          return {
            _id: id,
            docs: new Array<DocInfo>()
          };
        } else {
          // hm, some other error
          throw err;
        }
      })
      .then((origDoc: DocHeader) => {
        doc._rev = origDoc._rev;
        doc.docs = info;
        this.db.put(doc, function callback(err, result) {
          if (!err) {
            console.log("Successfully updated " + id + "!");
          } else {
            console.log("Unsuccessfully updated " + id + ", got error: " + err);
          }
        });
      });
  }

  getDoc(id: string) {
    return this.db.get(id).then((doc: DocHeader) => {
      return doc;
    });
  }

  // Function to init a blank document
  initDocument(name: string) {
    // Create an sample document with only one file
    const docsInfo: DocInfo[] = new Array<DocInfo>();
    const number1: DocInfo = {
      number: {
        original: 1,
        textual: "1",
        value: 1,
        color: 'red'
      },
      description: "Texto em branco. Vocẽ precisa alterar."
    };
    docsInfo.push(number1);
    const number2: DocInfo = {
      number: {
        original: 2,
        textual: "2",
        value: 2,
        color: 'orange'
      },
      description: "Texto em branco. Vocẽ precisa alterar."
    };
    docsInfo.push(number2);
    // Assembly informations in one object
    const initalDocument: DocHeader = {
      _id: name,
      docs: docsInfo
    };
    // Send initial document to database
    this.updateDoc(initalDocument._id, initalDocument.docs);
  }
}

// Custom interfaces to manage database doc structure
export interface DocHeader {
  _id: string;
  _rev?: string;
  docs: DocInfo[];
}

export interface DocInfo {
  number: NumberMapa;
  description: string;
}
