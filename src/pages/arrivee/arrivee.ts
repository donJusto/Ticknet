import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../services/share.service';
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
  serviceData: Array<any>;


  constructor(public shareService : ShareService, public navCtrl: NavController, public navParams: NavParams) {
    this.loadedCountryList = navParams.get('loadedCountryList');
    this.tic = navParams.get('tic');
    this.serviceData = shareService.initializeItems();
    console.log("get"+this.tic);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ArriveePage');
  }


  closeModal() {
    this.navCtrl.pop();
  }

}
