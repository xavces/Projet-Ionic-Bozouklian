import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pizza-details',
  templateUrl: 'pizza-details.html',
})
export class PizzaDetailsPage {

  pizza;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pizza = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PizzaDetailsPage');
  }

}
