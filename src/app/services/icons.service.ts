import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class IconsService {

  public IconsSet = [
    ['arrowdown', "assets/icons/regular/ArrowDown.svg"],
    ['arrowup', "assets/icons/regular/ArrowUp.svg"],
    ['back', "assets/icons/regular/Back.svg"],
    ['bag', "assets/icons/regular/Bag.svg"],
    ['calendar', "assets/icons/regular/Calendar.svg"],
    ['check', "assets/icons/regular/Check.svg"],
    ['clock', "assets/icons/regular/Clock.svg"],
    ['close', "assets/icons/regular/Close.svg"],
    ['eyeclosed', "assets/icons/regular/EyeClosed.svg"],
    ['eye', "assets/icons/regular/Eye.svg"],
    ['facebook', "assets/icons/regular/Facebook.svg"],
    ['hamburger', "assets/icons/regular/Hamburger.svg"],
    ['instagram', "assets/icons/regular/Instagram.svg"],
    ['phone', "assets/icons/regular/Phone.svg"],
    ['pin', "assets/icons/regular/Pin.svg"],
    ['search', "assets/icons/regular/Search.svg"],
    ['share', "assets/icons/regular/Share.svg"],
    ['plus', "assets/icons/small/Plus.svg"],
    ['plus-disabled', "assets/icons/small/PlusDisabled.svg"],
    ['minus', "assets/icons/small/Minus.svg"],
    ['minus-disabled', "assets/icons/small/MinusDisabled.svg"],
    ['close-small', "assets/icons/small/Close.svg"],
    ['plus-small', "assets/icons/small/Plus.svg"],
    ['delivery-man', "assets/icons/deliveryMan.svg"],
  ];

  public arrowdown="arrowdown";
  public arrowup="arrowup";
  public back="back";
  public bag="bag";
  public calendar="calendar";
  public check="check";
  public clock="clock";
  public close="close";
  public eyeclosed="eyeclosed";
  public eye="eye";
  public facebook="facebook";
  public hamburger="hamburger";
  public instagram="instagram";
  public phone="phone";
  public pin="pin";
  public search="search";
  public share="share";
  public plus="plus";
  public plusdisabled="plus-disabled";
  public minus="minus";
  public minusdisabled="minus-disabled";
  public closesmall="close-small";
  public plussmall="plus-small";
  public deliveryman="delivery-man";


  constructor(
    private matIconReg: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.IconsSet.forEach(ico => {
      matIconReg.addSvgIcon(ico[0], domSanitizer.bypassSecurityTrustResourceUrl(ico[1]));
    });
  }
}
