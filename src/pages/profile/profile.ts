import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/// import { User } from "../../models/user.model";
import { AngularFireAuth } from 'angularfire2/auth';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile.model';
import { NativeStorage } from '@ionic-native/native-storage';
// import { ReservationsPage } from '../reservations/reservations';
import { ConnexionPage } from '../connexion/connexion';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  nom: string;
  prenom: string;
  identifiant: string;
  nomNatif: string;
  prenomNatif: string;
  identifiantNatif: string;

  constructor(public events: Events, private storage: Storage, private nativeStorage: NativeStorage, public afDB: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  creerProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDB.list(`profile/${auth.uid}`).push(this.profile)
        .then(() => this.navCtrl.setRoot(ConnexionPage));
      console.log(this.profile.nom);
      console.log('User created!')
      // this.events.publish ('user:created','this.profile.nom'  );
      // this.storage.set('this.profile.nom', 'Max');
      this.storeUser();
    
      // this.getUser();
    })

  }
  public storeUser() {
    this.nativeStorage.setItem('userProfile', {
      nomNatif : this.profile.nom,
      identifiantNatif: this.profile.identifiant,
      prenomNatif: this.profile.prenom,
    })
      .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
      );

    }
    public getUser(){

    this.nativeStorage.getItem('userProfile')
      .then(
      data => {
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.identifiant = data.identifiant;
        
      }
      ,
      error => console.error(error)
      );
    }

  }
  // var user = firebase.auth().currentUser;
  // if (user != null {
  //   $scope.user = {
  //     name: user.displayName,
  //     email: user.email,
  //     photoURL: user.PhotoURL
  //   }
  // }



