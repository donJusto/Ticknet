import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


import { TabsPage } from '../pages/tabs/tabs';
import { ArretsPage } from '../pages/arrets/arrets';
import { ConnexionPage } from '../pages/connexion/connexion';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;


  constructor(public events: Events, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
    // Listening for the event when the user has logged in
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    // const unsubscribe = firebase.auth().onAuthStateChanged( user => {
    //   if (!user) {
    //     this.rootPage = 'ArretsPage';
    //     unsubscribe();
    //   } else { 
    //     this.rootPage = 'ProfilePage';
    //     unsubscribe();
    //   }
    // });
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      }
    });

  }

}

