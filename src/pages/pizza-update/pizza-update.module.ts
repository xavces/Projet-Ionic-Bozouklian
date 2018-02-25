import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaUpdatePage } from './pizza-update';

@NgModule({
  declarations: [
    PizzaUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaUpdatePage),
  ],
})
export class PizzaUpdatePageModule {}
