import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
// import { ToastController } from 'ionic-angular';

//Pages
import { ArretsPage } from '../pages/arrets/arrets';
import { PreferencesPage } from '../pages/preferences/preferences';
import { TicketsPage } from '../pages/tickets/tickets';
import { ReservationsPage } from '../pages/reservations/reservations';
import { TabsPage } from '../pages/tabs/tabs';
import { DepartPage } from '../pages/depart/depart';
import { ArriveePage } from '../pages/arrivee/arrivee';
import { ConnexionPage } from '../pages/connexion/connexion';
import { SignupPage } from '../pages/signup/signup';
import { ReinitialisermdpPage } from '../pages/reinitialisermdp/reinitialisermdp';
import { ProfilePage } from '../pages/profile/profile';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HttpModule } from '@angular/http';
//Angular

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Provider
import { AuthProvider } from '../providers/auth/auth';
import { ListevilleProvider } from '../providers/listeville/listeville';
import { UserProfileProvider } from '../providers/user-profile/user-profile';
// import { Firebase } from '../config/firebase';
// import { FIREBASE_CREDENTIALS } from "./firebase.credentials";

const firebaseConfig = {
  apiKey: "AIzaSyAS36WyHb4X8iJ62gzyX2omU1i-OLGPElw",
  authDomain: "tickness-6aea8.firebaseapp.com",
  databaseURL: "https://tickness-6aea8.firebaseio.com",
  projectId: "tickness-6aea8",
  storageBucket: "tickness-6aea8.appspot.com",
  messagingSenderId: "295256016006"
};

@NgModule({
  declarations: [
    // ToastController,
    MyApp,
    ArretsPage,
    PreferencesPage,
    TicketsPage,
    TabsPage,
    ArriveePage,
    ConnexionPage,
    DepartPage,
    ReservationsPage,
    SignupPage,
    ReinitialisermdpPage,
    ProfilePage,
  ],

  imports: [
    // ToastController,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ArretsPage,
    PreferencesPage,
    TicketsPage,
    TabsPage,
    ArriveePage,
    ConnexionPage,
    DepartPage,
    ReservationsPage,
    SignupPage,
    ReinitialisermdpPage,
    ProfilePage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AuthProvider,
    NativeStorage,
    ListevilleProvider,
    UserProfileProvider,
    
  ]
})
export class AppModule {}
