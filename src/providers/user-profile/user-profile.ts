import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
/// import { User } from "../../models/user.model";
import { AngularFireAuth } from 'angularfire2/auth';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//Pages
import { Profile } from '../../models/profile.model';

import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
// import { ReservationsPage } from '/home/juste/module/src/pages/reservations/reservations';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/*
  Generated class for the UserProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProfileProvider {
  profil : { identifiant: string,
    nom: string;
    prenom: string;} ;
  // nom: string;
  // prenom: string;
  // identifiant: string;
  // nomNatif: string;
  // prenomNatif: string;
  // identifiantNatif: string;
  private nav:NavController;


  constructor(private storage: Storage, public afDB: AngularFireDatabase, private app:App, private afAuth: AngularFireAuth, public http: HttpClient) {
    console.log('Hello UserProfileProvider Provider');
    this.nav = app.getActiveNav();
  }
  // creerProfile() {
  //   this.afAuth.authState.take(1).subscribe(auth => {
  //     this.afDB.object(`profile/${auth.uid}`).set(this.profil)
  //       .then(() => this.nav.setRoot(ReservationsPage));
  //     console.log(this.profil.identifiant);
  //     console.log('User created!')
     
  //   })

  }
  // public getUser(){

  //   this.nativeStorage.getItem('userProfile')
  //     .then(
  //     data => {
  //       this.nom = data.nom;
  //       this.prenom = data.prenom;
  //       this.identifiant = data.identifiant;
        
  //     }
  //     ,
  //     error => console.error(error)
  //     );
  //   }
    

  



