import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { ProfilePage } from '../profile/profile';
import { Profile } from '../../models/profile.model';
/**
 * Generated class for the DepartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-depart',
  templateUrl: 'depart.html',
})
export class DepartPage implements OnInit{

  paysObservable: Observable<any[]>;

  public countryList:Array<any>;
  public loadedCountryList:any;
  public countryRef:firebase.database.Reference;
  public mytest = {};
  profile = {} as Profile;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase) {

    
  }

  initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.countryList = this.countryList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.countryList.length);
  
  }

  ionViewDidLoad() {
    console.log(this.profile.nom);
    this.countryRef = firebase.database().ref('/pays');    
    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach( country => {
        countries.push(country.val());
        return false;
      });
    
      this.countryList = countries;
      this.loadedCountryList = countries;
      // console.table("test"+this.loadedCountryList[0]);
      
      
    });
  //   const countryRef: firebase.database.Reference = firebase.database().ref(`/benin/`);
  //   countryRef.on('value', testSnapshot => {
  //     this.mytest = testSnapshot.val();
  //     console.log('AAAAAAAAAAAAAAAAAAAAA');  
  //     //console.log(this.mytest);
  //     console.table(this.mytest);
  //     console.log(this.mytest['Abomey']);
  //   });
  }


  closeModal() {
    this.navCtrl.pop();
  }
  ngOnInit() {
    
    this.paysObservable = this.getPays('/benin/Cotonou');
    
    }
    
    getPays(listPath): Observable<any[]> {
    
    return this.afDb.list(listPath).valueChanges();
    
    }


}
