import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,List } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { ModalController, AlertController, } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';


//Providers
import { ListevilleProvider } from '../../providers/listeville/listeville';

//Pges
import { DepartPage } from '../depart/depart';
import { ArriveePage } from '../arrivee/arrivee';
import { ConnexionPage } from '../connexion/connexion';

@Component({
  selector: 'page-arrets',
  templateUrl: 'arrets.html'
})
export class ArretsPage {

  public ville: any;
  public rechercheVille: any;
  public user: any;
  public text: string;
  @ViewChild(List) list: List;


  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, public alrtCtrl: AlertController, public authData: AuthProvider, public modalCtrl: ModalController, public afDB: AngularFireDatabase, private storage: Storage, public listeVille: ListevilleProvider, public navCtrl: NavController) {

    // this.shareService.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArriveePage');
    this.ville = this.listeVille.countryList; 

    this.user = firebase.auth().currentUser;
    if (this.user != null) {
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

  stopSliding() {
    // this.list._mode(false);
  }


  getDepart() {
    let modal = this.modalCtrl.create(DepartPage);
    modal.present();
  }
  
  getArrivee() {
    let modal = this.modalCtrl.create(ArriveePage);
    modal.present();
  }

  getConnexion(){
    let modal = this.modalCtrl.create(ConnexionPage);
    modal.present();
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.rechercheVille=this.ville;
  
    // set q to the value of the searchbar
    var c = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!c) {
      return;
    }
  
    this.rechercheVille = this.rechercheVille.filter((v) => {
      if(v.name && c) {
        if (v.name.toLowerCase().indexOf(c.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(c, this.rechercheVille.length);
  
  }


}
