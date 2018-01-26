import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController, NavParams } from 'ionic-angular';
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
    public villeProvider: ListevilleProvider,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.villes = this.villeProvider.countryList;
  }

  reserver() {
    console.log("Aucune action implémentée pour l'instant ...");
  }

  showDepartAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Départ');
    
    this.villes.forEach(item => {
      
      if (item.ville == this.depart) {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: true
        })
      }
      else  {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: false
        })
      }
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
      if (item.ville == this.arrivee) {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: true
        })
      }
      else  {
        alert.addInput({
          type: 'radio',
          label: item.ville + ' - ' + item.pays,
          value: item.ville,
          checked: false
        })
      }
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

  // Todo: Find a way to prevent repetitive code

}
