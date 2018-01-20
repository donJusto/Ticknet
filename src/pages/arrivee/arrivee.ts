import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { ArretsPage } from '../arrets/arrets';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the ArriveePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-arrivee',
  templateUrl: 'arrivee.html',
})
export class ArriveePage implements OnInit{

  public loadedCountryList:any;
  public tic: string;
  public arrets : ArretsPage;
  public countries : any;
  public countryRef:firebase.database.Reference;
  public mytest = {};
  public countryList:Array<any>;
  public country: any;

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ngOnInit() {
    // this.countries=this.arrets.native;
    this.countryRef = firebase.database().ref('pays');    
    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach( country => {
        countries.push(country.val());
        return false;
      });
    
      this.countryList = countries;
      this.loadedCountryList = countries;
    
    })
  }

    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArriveePage');
    
  }


  closeModal() {
    this.navCtrl.pop();
  }

}
