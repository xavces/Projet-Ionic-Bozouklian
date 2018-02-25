import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaAddPage } from './pizza-add';

@NgModule({
  declarations: [
    PizzaAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaAddPage),
  ],
})
export class PizzaAddPageModule {}
