import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Panier } from '../../models/panier';


@Injectable()
export class PanierServiceProvider {

  private readonly url = "http://kim.jcatania.io:3000/panier/";

  constructor(public http: HttpClient) {
    console.log('Hello PanierServiceProvider Provider');
  }
  
  post(postParams: any){
    return new Promise<Array<Panier>>(resolve => {
      this.http.post(this.url, postParams)
        .subscribe(data => {
          alert("La pizza a été ajoutéé à votre panier!");
        }, error => {
          console.log(error);
        });
    });
  }

  get(){
    let panierArray: Array<Panier> = new Array<Panier>();

    return new Promise<Array<Panier>>(resolve => { 
      this.http.get(this.url)
        .subscribe((data: Array<any>) => {
          for(let i = 0; i < data.length ; i++){
            panierArray.push(new Panier(data[i]['id'], data[i]['pizzaId'], data[i]['quantity']))
          }
          resolve(panierArray);
          return(panierArray);
        });
    });
  }

  put(id: number, body) {
    return new Promise<Array<Panier>>(resolve => {
      this.http.put(this.url + id, body)
        .subscribe(
          data => {
            alert("La quantité de pizza a été modifiée!");
          },
          error => {
            console.log("Error", error);
          }
        );
    })
  }

  delete(id: number){
    this.http.delete(this.url + id)
      .subscribe(
        data => {
          alert("La pizza a été enlevée de votre panier! !");
        },
        error => {
          console.log("Error", error);
        }
      );
  }

}
