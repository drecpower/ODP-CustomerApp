import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppshellService } from './services/appshell.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from './services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { animFadeInOutAnimation, animFastFadeInOutAnimation, animRouteTransition, AnimSlowFadeInOutAnimation, longAnimFadeInOutAnimation } from './shared/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { Event as NavigationEvent } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { IconsService } from './services/icons.service';
import { LibraryLauncherService } from './services/library-launcher.service';
import { filter } from 'rxjs';
import { DialogService } from './services/dialog/dialog.service';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    animFadeInOutAnimation,
    animRouteTransition,
    animFastFadeInOutAnimation,
    longAnimFadeInOutAnimation,
    AnimSlowFadeInOutAnimation
  ]
})
export class AppComponent {
  title = 'ODP-CustomerApp';
  urlOld='';
  forcingForward:boolean =false;
  constructor(
    public router: Router,
    public appshell: AppshellService,
    public libraryLauncherSvc: LibraryLauncherService,
    public user: UserService,
    private breakpointObserver: BreakpointObserver,
    private matIconReg: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public icons: IconsService,
    public dialogSvc: DialogService,
    public cartSvc:CartService
  ) {
    try {
      var _self = this;
      router.events
        .pipe(
          filter(
            (event: NavigationEvent) => {
              return (event instanceof NavigationStart);
            }
          )
        )
        .subscribe(
          (event: any) => {
           if(_self.urlOld != event.url){
            _self.urlOld = event.url
            console.log('closeAll();');
            _self.dialogSvc.closeAll()
            if(cartSvc.sendingOrder){
              // _self.forceForward=true;
             router.navigateByUrl('/cart/payment');
            }
           }
          }
        )
        ;
    } catch (error) {

    }
  }
  @HostListener('window:popstate', ['$event'])
  back(event: any) {
    console.warn('HostListener app-component');
    // if (this.dialogSvc.ignoreBack > 0) {
    //   this.dialogSvc.ignoreBack--;
    // } else {
    this.dialogSvc.closeHostListener()

    // }
  }
}
