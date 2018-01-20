import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { NativeStorage } from '@ionic-native/native-storage';

import { ProfilePage } from '../profile/profile';
import { Profile } from '../../models/profile.model';
import { ReservationsPage } from '../reservations/reservations';
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
  public ville :any;

  
  
  
  constructor(private nativeStorage: NativeStorage, public events: Events, public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase) {

    
  }

  ngOnInit() {
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

//enreigistrer localement le choix d'une ville de départ


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

public ajouterDepart(ville){
  console.log('ville created!')
  this.events.publish(ville);
  this.storeChoice();
  this.navCtrl.push(ReservationsPage);
}

public storeChoice(){
  this.nativeStorage.setItem('myVille', {
    ville : this.ville 
  })
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
}


  closeModal() {
    this.navCtrl.pop();
  }

}
