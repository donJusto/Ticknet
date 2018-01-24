import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the ListevilleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ListevilleProvider {
  public countryRef:firebase.database.Reference;
  public mytest = {};
  public countryList:Array<any>;
  public loadedCountryList:any;
  public country: any;
  public test : Array<any>;
  public tic = "tac";
  public native:any;
  public profileRef :any;

//Provider pour importer la liste des villes de Firebase
  constructor(public http: HttpClient) {
    console.log('Hello ListevilleProvider Provider');
    console.log('ionViewDidLoad DepartPage');
    this.countryRef = firebase.database().ref('pays');    
    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach( country => {
        countries.push(country.val());
        return false;
      });
    
      this.countryList = countries;
      this.loadedCountryList = countries;
  this.native = countries;
  console.log("test provider");

  //     this.saveVariable();
  //     console.log("confirmé");
     
      // console.log(this.loadedCountryList[1][23].ville);  
      // this.parcourir();
      // console.log(this.test);  

      
    });
  }

  }

 