import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController,
  AlertController, NavParams } from 'ionic-angular';
// import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { User } from "../../models/user.model";
// import { AngularFireAuth } from 'angularfire2/auth';
// import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';


/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//pages
// import { ReservationsPage } from '../reservations/reservations';
// import { TicketsPage } from '../tickets/tickets';
// import { ConnexionPage } from '../connexion/connexion';
import { ProfilePage } from '../profile/profile';



@IonicPage({name:'signup'})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  // TicknetItems: FirebaseListObservable<any[]>;
  user = {} as User;
  form: FormGroup;

  constructor( public authProvider: AuthProvider,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        passwordconf: ['', Validators.compose([Validators.minLength(6), Validators.required])]}, {validator: SignupPage.passwordsMatch});
  }

  static passwordsMatch(cg:FormGroup): {[err: string]:any} {
    let password = cg.get('password');
    let passwordconf = cg.get('passwordconf');
    let rv: {[error: string]: any} = {};
    if((password.touched || passwordconf.touched) && password.value !== passwordconf.value){
      rv['passwordMismatch']= true;
    }
    return rv;
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email, 
        this.signupForm.value.password)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(ProfilePage);
        });
      }, (error) => {
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
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
    

  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'User was added successfully',
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });
  
  //   toast.present();
    
  // }

  //  async register(user: User) {
  //   try {
  //     const result = await this.afAuth.auth.createUserWithEmailAndPassword(
  //       user.email,
  //       user.password
  //     );
  //     if (result) {
  //       this.navCtrl.setRoot('TicketsPage');
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ConnexionPage');
  // }

  // closeModal() {
  //   this.navCtrl.pop();
  }

  // addNom() {
  //   this.firebaseProvider.addItem(this.nom);
  // }
 
  // removeItem(id) {
  //   this.firebaseProvider.removeItem(id);
  // }
  closeModal() {
    this.navCtrl.pop();
  }
  

}
