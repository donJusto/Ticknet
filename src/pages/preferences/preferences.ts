import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { ConnexionPage } from '../connexion/connexion';
import { DepartPage } from '../depart/depart';
import { ArriveePage } from '../arrivee/arrivee';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { SignupPage } from '../signup/signup';
import { Profile } from './../../models/profile.model';

import { ArretsPage } from '../arrets/arrets';

//import component
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { ModalController, AlertController, } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';




@Component({

  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})
export class PreferencesPage {


  favoris: Observable<any>; 
  public text: string;


  constructor(private storage: Storage, private nativeStorage: NativeStorage, private afAuth: AngularFireAuth, private toastCtrl: ToastController, public alrtCtrl: AlertController, public menuCtrl: MenuController, public platform: Platform, public authData: AuthProvider, public navParams: NavParams, public modalCtrl: ModalController, public afDB: AngularFireDatabase, public navCtrl: NavController) {
    this.favoris = afDB.list('/favoris').valueChanges();;  

  }

  logout() {
    const authObserver = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afAuth.auth.signOut();
        console.log("signout");
        this.toastCtrl.create({
          message: 'Déconnexion réussie',
          duration: 4000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',

        }).present();
      } else {
        this.toastCtrl.create({
          message: 'Vous êtes déjà déconnecté',
          duration: 4000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',

        }).present();
      }
    });

    this.text = "Connectez-vous à Ticknet !";


  }

  exitAlert() {
    let alert = this.alrtCtrl.create({
      title: 'Confirmer',
      message: 'Vous nous quittez?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, 
        {
          text: 'Oui',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
  openPage(page) {
    // this.navCtrl.setRoot(page.component)
    let modal = this.modalCtrl.create(page.component);
    modal.present();

  }
  getConnexionPage() {
    this.menuCtrl.open('ConnexionPage');
  }
  getSignupPage() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }


}
