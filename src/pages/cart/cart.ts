import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanierServiceProvider } from "../../providers/panier-service/panier-service";
import { PizzaServiceProvider } from "../../providers/pizza-service/pizza-service";



import { Pizza } from '../../models/pizza';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cart: any;
  pizzaArray: Array<Pizza> = new Array<Pizza>();
  quantityArray: Array<number> = new Array();
  cartToUpdate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private panierService: PanierServiceProvider,
    private pizzaService: PizzaServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.loadCart();
  }

  loadCart(){
    this.panierService.get().then(
      result => {
        this.cart = result;
        this.cart.forEach(element => {
          this.pizzaService.getById(element.pizzaId).then( result =>{
            this.pizzaArray.push(result);
            this.quantityArray.push(element.quantity);
            console.log(this.quantityArray)
          });
        });

      }
    );
  }

  async oneLessPizza(itemId) {
    if(this.cart[itemId].quantity>1){
      this.cart[itemId].quantity--;
      this.panierService.put(this.cart[itemId].id, this.cart[itemId]);
      await this.sleep(1000);
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
    else if (this.cart[itemId].quantity == 1){
      alert("Veuillez cliquer sur la corbeille pour supprimer la pizza");
    }
    else{
      alert("Nombre de pizza incorrect!");
    }
  }

  async oneMorePizza(itemId) {
    this.cart[itemId].quantity++;
    this.panierService.put(this.cart[itemId].id, this.cart[itemId]);
    await this.sleep(1000);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async deletePizza(itemId){
    this.panierService.delete(this.cart[itemId].id);
    await this.sleep(1000);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  backToHome(){
    this.navCtrl.push(HomePage);
  }

}
