import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';


//Providers
import { ListevilleProvider } from '../../providers/listeville/listeville';

import { ProfilePage } from '../profile/profile';
import { Profile } from '../../models/profile.model';
import { ReservationsPage } from '../reservations/reservations';
/**
 * Generated class for the DepartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-depart',
  templateUrl: 'depart.html',
})
export class DepartPage {
  public profile = {} as ProfilePage;

  public ville: any;
  public rechercheVille: any;  
  public user : any;
  public text : any;
  public profilModel = {} as Profile;

  
  constructor(private storage: Storage,public listeVille: ListevilleProvider,private nativeStorage: NativeStorage, public events: Events, public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase) {

    
  }

 
//enreigistrer localement le choix d'une ville de départ



  getItems(searchbar) {
    // Reset items back to all of the items
    this.rechercheVille = this.ville;
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.rechercheVille = this.rechercheVille.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.rechercheVille.length);
  
  }

  ionViewDidLoad() {
    //Appeler liste de ville
    this.ville = this.listeVille; 

    //stocker le user texte

    this.storage.get('myUser').then((data) => {
      this.text = data;
      this.user = firebase.auth().currentUser;
      if (this.user != null) {
        this.text = this.text ;
    
      }
      else {
          this.text = "Connectez-vous à Ticknet !"
      }
    
  })
}
  
  closeModal() {
    this.navCtrl.pop();
  }

}
