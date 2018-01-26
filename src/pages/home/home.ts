import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  ModalController,
  MenuController,
  NavController,
  AlertController,
  Platform,
  NavParams
} from 'ionic-angular';
import { ListevilleProvider } from '../../providers/listeville/listeville';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireObject
} from 'angularfire2/database';
import { Profile } from './../../models/profile.model';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


//Pages
import { DepartPage } from '../depart/depart';
import { ArriveePage } from '../arrivee/arrivee';

import { ConnexionPage } from '../connexion/connexion';
import { SignupPage } from '../signup/signup';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  villes: any;
  arrivee: string;
  depart: string;
  pays: Observable<any>;
  profileData: AngularFireObject<Profile>
  nbr: Array<number>
  public name: string;
  email: string;
  photoUrl: string;
  uid: string;
  emailVerified: string;
  public user: any;
  public text: string;
  public arrive: string;

  arrivTEST: string;
  public villeArrivee: any;
  pages: Array<{ title: string, component: any }>



  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public villeProvider: ListevilleProvider,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private storage: Storage,
    public afDB: AngularFireDatabase,
    public menuCtrl: MenuController,
    public platform: Platform,

  ) {

    this.pages = [
      { title: 'Connexion', component: ConnexionPage },
      { title: 'S\'identifier', component: SignupPage },
    ];
    console.log("test")

  }

  ngOnInit() {
    this.villes = this.villeProvider.countryList;
    console.table( this.villes)

  }

  reserver() {
    console.log("Aucune action implémentée pour l'instant ...");
  }

  showDepartAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Départ');
    console.log("je me teste");

    this.villes.forEach(item => {

      if (item.ville == this.depart) {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: true
        })
      }
      else {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: false
        })
      }
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.depart = data;
        console.log(data + ' est son choix de départ');
      }
    });

    alert.present();
  }

  showArriveAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Arrivées dispo');

    this.villes.forEach(item => {
      if (item.ville == this.arrivee) {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: true
        })
      }
      else {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: false
        })
      }
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: arr => {
        this.arrivee = arr;
        console.log(arr + ' est son choix d\'arrivée');
        this.storage.set('myVille', {
          arr: arr
        });
        // this.storage.get('myVille').then((data) => {
        //   this.arrive = data;

        // })
      }
    });

    alert.present();
  }

  //Todo: Find a way to prevent repetitive code
  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        this.toastCtrl.create({
          message: `Bienvenue sur Ticknet, ${data.email}`,
          duration: 4000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',
          cssClass: 'welcome'

        }).present();

        this.profileData = this.afDB.object(`profile/${data.uid}`);
        // console.table(this.profileData);

      }
      else {
        this.toastCtrl.create({
          message: 'Vous n\'êtes pas connecté, Connectez-vous à Ticknet! ',
          duration: 4000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',
        }).present();

      }
    });


    this.user = firebase.auth().currentUser;
    if (this.user != null) {
      this.name = this.user.displayName;
      this.text = "Bienveue à Ticknet, " + this.user.email;
      this.storage.set('myUser', this.text);
      this.storage.get('myUser').then((data) => {
        this.text = data;
        console.log(this.text);
      });

    }
    else {
      this.storage.set('myUser', this.text = "Connectez-vous à Ticknet !");
      this.storage.get('myUser').then((data) => {
        this.text = data
      });
      console.log(this.text);
    }

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

  openPage(page) {
    // this.navCtrl.setRoot(page.component)
    let modal = this.modalCtrl.create(page.component);
    modal.present();
    console.log("test")


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
    let alert = this.alertCtrl.create({
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

  getConnexionPage() {
    this.menuCtrl.open('ConnexionPage');
  }
  getSignupPage() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }
  test() {
    console.log("test")

  }

}
