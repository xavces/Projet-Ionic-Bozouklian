import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { PizzaServiceProvider } from '../../providers/pizza-service/pizza-service';
import { HomePage } from '../../pages/home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-pizza-add',
  templateUrl: 'pizza-add.html',
})
export class PizzaAddPage {

checkboxIsOpen = false;

allIngredients = ["Tomate", "Fromages", "Mozzarela", "Oignon", "Poulet", "Kebab", "Chevre", "Miel", 
"Crême Fraiche", "Viande Haché", "Jambon", "Champignon", "Aubergine", "Poivron"];
ingredients = [];
base64Image = null;
imageImported = "";

pizzaAdd = {
  name: "",
  desc: "",
  picture: "",
  price: "",
  ingredients: this.ingredients
};

constructor(public navCtrl: NavController,
            public pizza: PizzaServiceProvider,
            public alertController: AlertController,
            public camera: Camera) {
}

ionViewDidLoad() {
  console.log('ionViewDidLoad PizzaAddPage');
}

alerte() {
  let alert = this.alertController.create({
    title: 'Champ manquant',
    subTitle: 'Veuillez remplir tout les champs',
    buttons: ["D'accord Monsieur!"]
  });
  alert.present();
}

selectIngredients() {
  let alert = this.alertController.create();
  alert.setTitle('Quel ingrédients souhaitez-vous mettre dans votre pizza ?');
  this.allIngredients.forEach(ingredient => {
    alert.addInput({
      type:'checkbox',
      label: ingredient,
      value: ingredient
    });
  });
  
  alert.addButton('Cancel');
  alert.addButton({
    text: 'Ok',
    handler: data => {
      console.log('Checkbox data:', data);
      this.checkboxIsOpen = false;
      this.pizzaAdd.ingredients = data;
      this.ingredients = data;
    }
  });
  alert.present();
}

create(){
  console.log(this.pizzaAdd.ingredients)
  if(this.pizzaAdd.name && this.pizzaAdd.desc && this.pizzaAdd.ingredients && this.pizzaAdd.picture && this.pizzaAdd.price){
    this.pizza.post(this.pizzaAdd)
      .then(data => {
        console.log(data);
        this.navCtrl.push(HomePage);
      }, error => {
        console.log(error);// Error getting the data
      });
  } else {
    this.alerte();
  }
}

changePrice(price){
  this.pizzaAdd.price = price + ".00";
}

takePicture(){
  this.camera.getPicture({
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 1000,
    targetHeight: 1000
  }).then((imageData) => {
    this.base64Image = "data:image/jpeg;base64," + imageData;
    this.pizzaAdd.picture = this.base64Image;
    this.imageImported = "";
  }, (err) => {
    console.log(err);
  });
}

importPicture(){
  const options: CameraOptions = {
    quality: 100,
    allowEdit : true,
    sourceType: this.camera.DestinationType.DATA_URL,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageImported = 'data:image/jpeg;base64,' + imageData;
    this.pizzaAdd.picture = this.imageImported;
    this.base64Image = "";
  }, (err) => {
    console.log(err);
  });
}

backToHome(){
  this.navCtrl.push(HomePage);
}

}
