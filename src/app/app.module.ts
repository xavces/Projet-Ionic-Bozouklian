import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PizzaDetailsPage } from '../pages/pizza-details/pizza-details';
import { PizzaAddPage } from '../pages/pizza-add/pizza-add';
import { PizzaUpdatePage } from '../pages/pizza-update/pizza-update';
import { CartPage } from '../pages/cart/cart';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PizzaServiceProvider } from '../providers/pizza-service/pizza-service';
import { PanierServiceProvider } from '../providers/panier-service/panier-service';

import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PizzaDetailsPage,
    PizzaAddPage,
    PizzaUpdatePage,
    CartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PizzaDetailsPage,
    PizzaAddPage,
    PizzaUpdatePage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PizzaServiceProvider,
    PanierServiceProvider,
    HttpClient,
    Camera
  ]
})
export class AppModule {}
