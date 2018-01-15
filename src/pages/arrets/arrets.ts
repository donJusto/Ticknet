import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

//Pges
import { DepartPage } from '../depart/depart';
import { ArriveePage } from '../arrivee/arrivee';
import { ConnexionPage } from '../connexion/connexion';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'page-arrets',
  templateUrl: 'arrets.html'
})
export class ArretsPage /*implements OnInit*/ {

  public countryRef:firebase.database.Reference;
  public mytest = {};
  public countryList:Array<any>;
  public loadedCountryList:any;
  public country: any;
  public test : Array<any>;
  public tic = "tac";

  constructor(public shareService: ShareService, public modalCtrl:ModalController, public navCtrl: NavController) {

    this.shareService.initializeItems();
  }

  // ngOnInit() {
    
  //   console.log('ionViewDidLoad DepartPage');
  //   this.countryRef = firebase.database().ref('pays');    
  //   this.countryRef.on('value', countryList => {
  //     let countries = [];
  //     countryList.forEach( country => {
  //       countries.push(country.val());
  //       return false;
  //     });
    
  //     this.countryList = countries;
  //     this.loadedCountryList = countries;
  //     this.saveVariable();
  //     console.log("confirmé");
     
  //     // console.log(this.loadedCountryList[1][23].ville);  
  //     // this.parcourir();
  //     // console.log(this.test);  

      
  //   });
  // }
    // const countryRef: firebase.database.Reference = firebase.database().ref(`/benin/`);
    // countryRef.on('value', testSnapshot => {
    //   this.mytest = testSnapshot.val();
    //   console.log('AAAAAAAAAAAAAAAAAAAAA');  
    //   //console.log(this.mytest);
    //   console.table(this.mytest);
    //   // console.log(this.mytest['Abomey']);
    // });
  
  // parcourir(){
  //   for(var i=0; i < 3; i++){
  //   for(var j=0;j<20;j++){
  //     console.table(this.loadedCountryList[i][j]);  
  //   }
  // }
  // }
  saveVariable(){
    this.navCtrl.push(ArriveePage, {
      list : this.loadedCountryList, 
      ti: this.tic
    })
    console.log(this.tic);
  }
  initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }

  getDepart() {
    let modal = this.modalCtrl.create(DepartPage);
    modal.present();
  }
  
  getArrivee() {
    let modal = this.modalCtrl.create(ArriveePage);
    modal.present();
  }

  getConnexion(){
    let modal = this.modalCtrl.create(ConnexionPage);
    modal.present();
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var c = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!c) {
      return;
    }
  
    this.countryList = this.countryList.filter((v) => {
      if(v.name && c) {
        if (v.name.toLowerCase().indexOf(c.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(c, this.countryList.length);
  
  }


}
