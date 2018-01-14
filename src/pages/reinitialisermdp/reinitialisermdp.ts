import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
// import { FirebaseListObservable } from 'angularfire2/database';
// import { FirebaseProvider } from './../../providers/firebase/firebase';
// import { User } from "../../models/user.model";
// import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the ReinitialisermdpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'reinitialisermdp'})
@Component({
  selector: 'page-reinitialisermdp',
  templateUrl: 'reinitialisermdp.html',
})
export class ReinitialisermdpPage {
  loginForm: FormGroup;
  loading: Loading;
  public resetPasswordForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public authData: AuthProvider, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
      this.resetPasswordForm = formBuilder.group({
        email: ['', 
        Validators.compose([Validators.required, EmailValidator.isValid])],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReinitialisermdpPage');
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email)
      .then((user) => {
        let alert = this.alertCtrl.create({
          message: "We just sent you a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        errorAlert.present();
      });
    }
  }
  closeModal() {
    this.navCtrl.pop();
  }
}
