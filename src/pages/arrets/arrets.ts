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
<<<<<<< HEAD
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShareService } from '../../services/share.service';
=======
>>>>>>> dimension

@Component({
  selector: 'page-arrets',
  templateUrl: 'arrets.html'
})
<<<<<<< HEAD
export class ArretsPage /*implements OnInit*/ {
=======
export class ArretsPage {

  public ville: any;
  public rechercheVille: any;
  public user: any;
  public text: string;
  @ViewChild(List) list: List;
>>>>>>> dimension


<<<<<<< HEAD
  constructor(public shareService: ShareService, public modalCtrl:ModalController, public navCtrl: NavController) {
=======
  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, public alrtCtrl: AlertController, public authData: AuthProvider, public modalCtrl: ModalController, public afDB: AngularFireDatabase, private storage: Storage, public listeVille: ListevilleProvider, public navCtrl: NavController) {
>>>>>>> dimension

    this.shareService.initializeItems();
  }

<<<<<<< HEAD
  // ngOnInit() {
    
  //   console.log('ionViewDidLoad DepartPage');
  //   this.countryRef = firebase.database().ref('pays');    
  //   this.countryRef.on('value', countryList => {
  //     let countries = [];
  //     countryList.forEach( country => {
  //       countries.push(country.val());
  //       return false;
  //     });
    
  //     this.countryList = countries;
  //     this.loadedCountryList = countries;
  //     this.saveVariable();
  //     console.log("confirmé");
     
  //     // console.log(this.loadedCountryList[1][23].ville);  
  //     // this.parcourir();
  //     // console.log(this.test);  

      
  //   });
  // }
    // const countryRef: firebase.database.Reference = firebase.database().ref(`/benin/`);
    // countryRef.on('value', testSnapshot => {
    //   this.mytest = testSnapshot.val();
    //   console.log('AAAAAAAAAAAAAAAAAAAAA');  
    //   //console.log(this.mytest);
    //   console.table(this.mytest);
    //   // console.log(this.mytest['Abomey']);
    // });
  
  // parcourir(){
  //   for(var i=0; i < 3; i++){
  //   for(var j=0;j<20;j++){
  //     console.table(this.loadedCountryList[i][j]);  
  //   }
  // }
  // }
  saveVariable(){
    this.navCtrl.push(ArriveePage, {
      list : this.loadedCountryList, 
      ti: this.tic
    })
    console.log(this.tic);
=======
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


>>>>>>> dimension
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
