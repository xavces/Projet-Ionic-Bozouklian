import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { PizzaServiceProvider } from '../../providers/pizza-service/pizza-service';

import { PizzaDetailsPage } from '../pizza-details/pizza-details';

import { PizzaUpdatePage } from '../pizza-update/pizza-update';
import { CartPage } from '../cart/cart';
import { PanierServiceProvider } from '../../providers/panier-service/panier-service';
import { PizzaAddPage } from '../pizza-add/pizza-add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pizzaArray: any;
  pizzaSearch: any;
  pizzaId;
  admin: boolean = false;
  panierArray:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pizza: PizzaServiceProvider, public events: Events,
  private zone: NgZone, private panier: PanierServiceProvider) {
    this.admin = navParams.get("admin");
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        this.reload();
      });
    });
  }

  ionViewDidLoad() {
    this.pizza.get().then(items => {
      this.pizzaArray = items;
    });
  }

  locateId() {
  	this.pizza.getById(this.pizzaId).then(item => {
      this.pizzaSearch = item;
      console.log(item);
    });
  }

  showPizza(item) {
    this.navCtrl.push(PizzaDetailsPage, {
      item: item
    });
  }

  updatePizza(item) {
    this.navCtrl.push(PizzaUpdatePage, {
      item: item
    });
  }

  deletePizza(item){
    console.log(item);
    this.pizza.delete(item.id);
    this.events.publish('updateScreen');
  }

  changeRole(){
    if(this.admin){
      this.admin=false;
    }
    else{
      this.admin = true;
    }
  }

  async reload(){
    await this.sleep(1000);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cart(){
    this.navCtrl.push(CartPage);
  }

  async addToCart(item){
    let books =
      { pizzaId: item.id, quantity: 1 }
    ;
    let pizzaAlreadyInCart = false;
    this.panier.get().then(items => {
      items.forEach(function(pizzaInCart){
        if(pizzaInCart.pizzaId == item.id){
          alert("Pizza déja dans le panier, veuillez modifier la quantité depuis votre panier");
          pizzaAlreadyInCart = true;
        }
      });
    });
    await this.sleep(500);
    if(pizzaAlreadyInCart == false){
      this.panier.post(books).then(
        (succes) => {
          console.log(succes);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  addAPizza(){
    this.navCtrl.push(PizzaAddPage);
  }


}
