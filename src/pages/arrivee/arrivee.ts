import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import { ShareService } from '../../services/share.service';
=======
import { OnInit } from '@angular/core';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { SignupPage } from '../signup/signup';
import { Profile } from './../../models/profile.model';

>>>>>>> dimension
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
import { ProfilePage } from '../profile/profile';


//Providers
import { ListevilleProvider } from '../../providers/listeville/listeville';

/**
 * Generated class for the ArriveePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-arrivee',
  templateUrl: 'arrivee.html',
})
export class ArriveePage {

<<<<<<< HEAD
  public loadedCountryList:any;
  public tic: string;
  serviceData: Array<any>;
=======
  public ville: any;
  nbr: Array<number>
  public name: string;
  email: string;
  photoUrl: string;
  uid: string;
  emailVerified: string;
  public user: any;
  public text: string;

  
>>>>>>> dimension

  constructor(private storage: Storage, private nativeStorage: NativeStorage, private afAuth: AngularFireAuth, private toastCtrl: ToastController, public alrtCtrl: AlertController,  public authData: AuthProvider,  public modalCtrl: ModalController, public afDB: AngularFireDatabase,public listeVille: ListevilleProvider,public navCtrl: NavController, public navParams: NavParams) {

<<<<<<< HEAD
  constructor(public shareService : ShareService, public navCtrl: NavController, public navParams: NavParams) {
    this.loadedCountryList = navParams.get('loadedCountryList');
    this.tic = navParams.get('tic');
    this.serviceData = shareService.initializeItems();
    console.log("get"+this.tic);
=======
>>>>>>> dimension
  }

    
  ionViewDidLoad() {

    console.log('ionViewDidLoad ArriveePage');
    this.ville = this.listeVille.countryList; 

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


  closeModal() {
    this.navCtrl.pop();
  }

}
