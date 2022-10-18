import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryFeeService {

  constructor() { }

  calc(radiusDistance:number|undefined,routeDistance:number=0){
    var fee :number|undefined= undefined;
    try {
      fee = Math.random()*100;
    } catch (error) {
      
    }
    return fee;
  }

}
