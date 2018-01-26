import { Component } from '@angular/core';

import { ArretsPage } from '../arrets/arrets';
import { TicketsPage } from '../tickets/tickets';
import { PreferencesPage } from '../preferences/preferences';
import { ReservationsPage } from '../reservations/reservations';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { SignupPage } from '../signup/signup';
import { Profile } from './../../models/profile.model'
//import component
import { ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = ReservationsPage;
  tab2Root = TicketsPage;
  tab3Root = ArretsPage;
  tab4Root = PreferencesPage;
  tab5Root = HomePage;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, public alrtCtrl: AlertController, public platform: Platform, public authData: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDB: AngularFireDatabase) {

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
