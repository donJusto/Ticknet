import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { ConnexionPage } from '../connexion/connexion';
import { DepartPage } from '../depart/depart';
import { ArriveePage } from '../arrivee/arrivee';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { SignupPage } from '../signup/signup';
import { Profile } from './../../models/profile.model';
//import component
import { ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html'
})
export class TicketsPage {

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, public alrtCtrl: AlertController, public menuCtrl: MenuController, public platform: Platform, public authData: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDB: AngularFireDatabase) {

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

}
