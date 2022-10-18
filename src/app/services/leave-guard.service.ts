import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationStart, Router, RouterStateSnapshot } from '@angular/router';
import { DialogService } from './dialog/dialog.service';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LeaveGuardService {
  lastTrigger: string | undefined; //any= 'imperative' | 'popstate' | 'hashchange';

  constructor(
    private router: Router,
    private location: Location,
    public dialogSvc: DialogService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.lastTrigger = event.navigationTrigger;
      }
    });
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Fix browser history if leaving prevented and called by back/forward navigation
    // var back = this.dialogSvc.back();
    // if (!back) {
      (<any>this.location).go(state.url);
    // }
    return true;
  }
}
