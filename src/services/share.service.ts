import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

 
@Injectable()

export class ShareService {
    public countryRef:firebase.database.Reference;
    public countryList:Array<any>;
    public loadedCountryList:any;
    public country: any;
    public test : Array<any>;
    public tic = "tac";
  
     
    firstName: string;
    lastName: string;
 
    constructor(public modalCtrl:ModalController, public navCtrl: NavController) {
        this.countryRef = firebase.database().ref('pays');    
        this.countryRef.on('value', countryList => {
          let countries = [];
          countryList.forEach( country => {
            countries.push(country.val());
            return false;
          });
        
          this.countryList = countries;
          this.loadedCountryList = countries;
     
    });
}
initializeItems(): any {
    this.countryList = this.loadedCountryList;
    return this.countryList;
    // console.log("loaded"+this.tic);
  }

    setUserName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;       
    }
  
    getUserName() {
        return this.firstName + ' ' + this.lastName;
    }  
}