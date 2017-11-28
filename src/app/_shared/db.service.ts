import { Injectable } from "@angular/core";

import PouchDB from "pouchdb-browser";

@Injectable()
export class DBService {
  db: any;

  constructor() {
    console.log("DB Service created...");
    this.connect();
  }

  connect() {
    this.db = new PouchDB("todos");
    const remote =
      "https://8662919f-e8d0-4227-8526-8c1a0f31b237-bluemix:5f43b9ac08a73bee3831fd0074364110038af114d8ee479d2953b4119de45a83@8662919f-e8d0-4227-8526-8c1a0f31b237-bluemix.cloudant.com/todos";
    const remoteDB = new PouchDB(remote);
    this.db
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
}
