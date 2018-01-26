import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { ListevilleProvider } from '../../providers/listeville/listeville';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  
  villes : any;
  arrivee: string;
  depart: string;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public navParams: NavParams,
    public villeProvider: ListevilleProvider
  ) { }

  ngOnInit() {
    this.villes = this.villeProvider.countryList;
  }

  showDepartAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Départ');
    
    this.villes.forEach(item => {
      alert.addInput({
        type: 'radio',
        label: item.ville + ' - ' + item.pays,
        value: item.ville,
        checked: false
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.depart = data;
        console.log(data + ' est son choix');
      }
    });

    alert.present();
  }

  showArriveAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Arrivées dispo');
    
    this.villes.forEach(item => {
      alert.addInput({
        type: 'radio',
        label: item.ville + ' - ' + item.pays,
        value: item.ville,
        checked: false
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.arrivee = data;
        console.log(data + ' est son choix');
      }
    });

    alert.present();
  }

}
