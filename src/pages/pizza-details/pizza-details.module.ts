import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaDetailsPage } from './pizza-details';

@NgModule({
  declarations: [
    PizzaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaDetailsPage),
  ],
})
export class PizzaDetailsPageModule {}
