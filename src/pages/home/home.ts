import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController, NavParams } from 'ionic-angular';
import { ListevilleProvider } from '../../providers/listeville/listeville';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from './../../models/profile.model';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  
  villes : any;
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
  
  arrivTEST: string;
  public villeArrivee: any;


  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public navParams: NavParams,
    public villeProvider: ListevilleProvider,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth, 
    private toastCtrl: ToastController, 
    private storage: Storage, 
    public afDB: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.villes = this.villeProvider.countryList;
  }

  reserver() {
    console.log("Aucune action implémentée pour l'instant ...");
  }

  showDepartAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Départ');
    
    this.villes.forEach(item => {
      
      if (item.ville == this.depart) {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: true
        })
      }
      else  {
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
        console.log(data + ' est son choix');
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
      else  {
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
        this.arrivee = data;
        console.log(data + ' est son choix');
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

}
