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
import { ReservationsPage } from '../reservations/reservations';
//Providers
import { UserProfileProvider } from '../../providers/user-profile/user-profile';

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

  public monProfil: any;
  public profilModel = {} as Profile;

  constructor(public userProfile: UserProfileProvider, public events: Events, private storage: Storage, private nativeStorage: NativeStorage, public afDB: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }





  ionViewDidLoad() {

    // console.log('ionViewDidLoad ProfilePage');
    // console.log(this.profilModel.identifiant);


    //Pour la création d'un profil

    //     this.userProfile.creerProfile();
    // console.log(this.userProfile.profil.identifiant);
    // // console.log('User created!')
    // this.events.publish ('user:created','this.profile.nom'  );
    // this.storage.set('this.profile.nom', 'Max');
    // this.storeUser();

    // this.getUser();
  }

  creerProfil() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDB.list(`profile/${auth.uid}`).push(this.profilModel)
        .then(() => this.navCtrl.setRoot(ReservationsPage));
      this.storage.set('myProfile', this.profilModel.identifiant);
      this.storage.get('myProfile').then((data) => {
        this.profilModel.identifiant = data;


        console.log(this.profilModel.identifiant);
        console.log('User created!');

      })

    })
  }


}