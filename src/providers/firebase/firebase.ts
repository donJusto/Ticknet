import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  getTicknetItems() {
    return this.afd.list('/TicknetItems/');
  }
 
  addItem(name) {
    this.afd.list('/TicknetItems/').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/TicknetItems/').remove(id);
  }
}


