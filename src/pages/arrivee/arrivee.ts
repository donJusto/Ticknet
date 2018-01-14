import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ArretsPage } from '../arrets/arrets';

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

  public loadedCountryList:any;
  public tic: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadedCountryList = navParams.get('loadedCountryList');
    this.tic = navParams.get('tic');
    console.log(this.tic);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArriveePage');
  }


  closeModal() {
    this.navCtrl.pop();
  }

}
