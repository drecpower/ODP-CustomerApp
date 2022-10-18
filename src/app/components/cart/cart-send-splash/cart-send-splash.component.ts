import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-send-splash',
  templateUrl: './cart-send-splash.component.html',
  styleUrls: ['./cart-send-splash.component.scss']
})
export class CartSendSplashComponent implements OnInit {

  constructor() { }
  listSplash: { text: string, image: string }[] = [
    { text: "Sending your order", image: "http://www.k2marketingdigital.com.br/gallery_gen/0ea90260ee7f390b7ba8dd26df66449e_anim.gif" },
    { text: "Waiting kitchen is ready", image: "https://cdn.w600.comps.canstockphoto.com.br/interior-apartamento-desenho-cozinha-vetor-eps_csp31691449.jpg" },
    { text: "Hitting your juice", image: "https://cdn-icons-png.flaticon.com/512/2442/2442019.png" }, 
    { text: "Running after the cow that got away", image: "https://i.pinimg.com/originals/ba/7b/49/ba7b499f56dc4258c0629ccf4bb7d911.gif"}
  ];
  currentSplash: number = 0

  ngOnInit(): void {
    var _self = this;
    this.next();
    setInterval(function () {
      _self.next();
    }, 2500);
  }
  next() {
    if (this.currentSplash == (this.listSplash.length - 1)) {
      this.currentSplash =0;
    }else{
      this.currentSplash++;
    }
  }
}
