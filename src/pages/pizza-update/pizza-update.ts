import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PizzaServiceProvider } from '../../providers/pizza-service/pizza-service';

/**
 * Generated class for the PizzaUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pizza-update',
  templateUrl: 'pizza-update.html',
})
export class PizzaUpdatePage {

  pizzaToUpdate;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private pizza: PizzaServiceProvider) {
    this.pizzaToUpdate = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PizzaUpdatePage');
  }

  update(){
    this.pizza.put(this.pizzaToUpdate.id, this.pizzaToUpdate)
  }

}
