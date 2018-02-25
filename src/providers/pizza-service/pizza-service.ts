import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizza';

@Injectable()
export class PizzaServiceProvider {

  // URL des pizzas présente dans le WebService
  private readonly url = "http://kim.jcatania.io:3000/pizza2/";

  constructor(public http: HttpClient) {
    console.log('Hello PizzaServiceProvider Provider');
  }

  /**
   * Fonction qui permet de récupérer TOUTES les pizzas présentes dans le WebService
   * 
   * @return Promise<Array<Pizza>>
   */
  get(){
    // On défini un tableau de pizza
    let pizzaArray: Array<Pizza> = new Array<Pizza>();
    
    //On retourne un tableau de pizza sous forme de promesse
  	return new Promise<Array<Pizza>>(resolve => {
  		this.http.get(this.url)
  			.subscribe((data: Array<any>) => {
	  			for(let i = 0; i < data.length ; i++){
            // On ajoute une nouvelle pizza dans le tableau
	  				pizzaArray.push(new Pizza(data[i]['id'], data[i]['name'], data[i]['desc'], data[i]['picture'], data[i]['price'], data[i]['ingredients']))
          }
        // On indique le tableau à retourner
	  		resolve(pizzaArray);
	  	});
  	});
  }

  /**
   * Cherche une pizza où l'id correspond à celui passé en paramètre
   * @param idPizza 
   * 
   * @return
   */
  getById(idPizza: number){

    let pizzaResult;
    let pizzaArray: Array<Pizza> = new Array<Pizza>();

  	return new Promise<Pizza>(resolve => {
  		this.http.get(this.url)
  			.subscribe((data: Array<any>) => {
          for(let i = 0; i < data.length ; i++){
            if(data[i]['id'] == idPizza)
            // On ajoute une nouvelle pizza dans le tableau
	  				  pizzaResult = new Pizza(data[i]['id'], data[i]['name'], data[i]['desc'], data[i]['picture'], data[i]['price'], data[i]['ingredients'])
          }
	  		resolve(pizzaResult);
	  	});
  	});
  }

  post(postParams: any) {
    return new Promise<Array<Pizza>>(resolve => {
      this.http.post(this.url, postParams)
        .subscribe(data => {
          alert("La pizza a été créée!");
        }, error => {
          console.log(error);
        });
    });
  }

  put(id: number, body) {
    return new Promise<Array<Pizza>>(resolve => {
      this.http.put(this.url + id, body)
        .subscribe(
          data => {
            alert("La pizza a été modifiée!");
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
          alert("La pizza a été supprimée!");
        },
        error => {
          console.log("Error", error);
        }
      );
  }

}
