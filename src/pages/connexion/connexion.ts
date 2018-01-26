import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ModalController,LoadingController, Loading, AlertController } from 'ionic-angular';
// import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { User } from "../../models/user.model";
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';


//pages
import { ReservationsPage } from '../reservations/reservations';
import { SignupPage } from '../signup/signup';
// import { ArretsPage } from '../arrets/arrets';
import { TabsPage } from '../tabs/tabs';
import { ReinitialisermdpPage } from '../reinitialisermdp/reinitialisermdp';
// import { TicketsPage } from '../tickets/tickets';
import { ProfilePage } from '../profile/profile';
import { TicketsPage } from '../tickets/tickets';
// import { Profile } from '../../models/profile.model';

@IonicPage({ name: 'connexion'})
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  public loginForm: FormGroup;
  public loading: Loading;
  public resetPasswordForm:FormGroup;
  public userEmail: string;
  // public profil = {} as ProfilePage;

  // TicknetItems: FirebaseListObservable<any[]>;
  user = {} as User;

  constructor(public modalCtrl: ModalController, private toastCtrl: ToastController, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,public authData: AuthProvider, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    // this.TicknetItems = this.firebaseProvider.getTicknetItems();

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
      Validators.required])]
    });

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    })
    
    }
    goToReinitialisermdp(){
      this.navCtrl.push('ReinitialisermdpPage');
    }
    
    createAccount(){
      this.navCtrl.push('SignupPage');
    }

    loginUser(){
      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      } else {
        this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          console.log("Connexion");
          this.navCtrl.setRoot(TabsPage);
          this.toastCtrl.create({
            message: `Vous êtes connecté à Ticknet`,
            duration: 3000
          }).present();
          // console.log(this.profil.nomProfil);
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
    
        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
      }
    }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        user.email, 
        user.password
      );
      if (result) {
        this.navCtrl.setRoot(TicketsPage);
      }  
    }
    catch (e) {
      console.error(e);
    }
  }
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        this.navCtrl.setRoot('TicketsPage');
      }
    } catch (e) {
      console.error(e);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
    console.log("ceci est" +this.user.email);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  // addNom() {
  //   this.firebaseProvider.addItem(this.nom);
  // }
 
  // removeItem(id) {
  //   this.firebaseProvider.removeItem(id);
  // }

  getSignup(){
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

  getReinitialisermdp (){
    let modal = this.modalCtrl.create(ReinitialisermdpPage);
    modal.present();
  }

}
