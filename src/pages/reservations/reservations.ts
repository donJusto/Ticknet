import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { ConnexionPage } from '../connexion/connexion';
import { DepartPage } from '../depart/depart';
import { ArriveePage } from '../arrivee/arrivee';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { SignupPage } from '../signup/signup';
import { Profile } from './../../models/profile.model';

import { ArretsPage } from '../arrets/arrets';

//import component
import { NativeStorage } from '@ionic-native/native-storage';
import { ModalController, AlertController,  } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html',
})
export class ReservationsPage {
  pages: Array<{ title: string, component: any }>
  public myPerson = {};
  public mybus = {};
  public myville = [];

  public loadedCountryList:any;
  public tic: string;

  pays: Observable<any>;
  profileData: AngularFireObject<Profile>
  nbr: Array<number>



  constructor(private nativeStorage: NativeStorage, public events : Events, private afAuth: AngularFireAuth, private toastCtrl: ToastController, public alrtCtrl: AlertController, public menuCtrl: MenuController, public platform: Platform, public authData: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDB: AngularFireDatabase) {
    this.pays = afDB.list('/pays').valueChanges();
    this.pages = [
      { title: 'Connexion', component: ConnexionPage },
      { title: 'S\'identifier', component: SignupPage }
    ];
    // this.loadedCountryList = navParams.get('loadedCountryList');
    // this.tic = navParams.get('tic');
    // console.log(this.tic);
    this.events.subscribe('ville:created', (ville) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', ville);
    });
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        this.toastCtrl.create({ 
          message: `Bienvenue sur Ticknet, ${data.email}`,
          duration: 4000,
          position: 'top',
          showCloseButton: true,
          closeButtonText	: 'Fermer',
          cssClass : 'welcome'

        }).present();
        
        this.profileData = this.afDB.object(`profile/${data.uid}`);
        // console.table(this.profileData);

      }
      else {
        this.toastCtrl.create({
          message: 'Détails d\'authentification introuvables',
          duration: 3000
        }).present();

      }
    });


    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
    console.log();
    const mybusRef: firebase.database.Reference = firebase.database().ref(`/bus/`);
    mybusRef.on('value', busSnapshot => {
      this.mybus = busSnapshot.val();
    });
    const paysRef: firebase.database.Reference = firebase.database().ref(`/pays/`);
    paysRef.on('value', paysSnapshot => {
      this.pays = paysSnapshot.val();
      // console.log(Niger[1].ville);

    });

  }





  getConnexion() {
    let modal = this.modalCtrl.create(ConnexionPage);
    modal.present();
  }

  getDepart() {
    let modal = this.modalCtrl.create(DepartPage);
    modal.present();
  }

  getArrivee() {
    let modal = this.modalCtrl.create(ArriveePage);
    modal.present();
  }


  createPerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.set({
      firstName,
      lastName
    })

  }
  logout() {
    this.authData.logoutUser();
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
    // let modal = this.modalCtrl.create(ConnexionPage);
    // modal.present();
    // this.menuCtrl.enable(false, signupMenu);  //disabling all other menus
    // this.menuCtrl.enable(false, page3menu);
    // this.menuCtrl.enable(true, page1menu);
    this.menuCtrl.open('ConnexionPage');
  }
  getSignupPage() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

}
