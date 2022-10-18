import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppshellService } from '../../services/appshell.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { animFadeInOutAnimation, animFastFadeInOutAnimation, animRouteTransition, AnimSlowFadeInOutAnimation, longAnimFadeInOutAnimation } from '../../shared/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    animFadeInOutAnimation,
    animRouteTransition,
    animFastFadeInOutAnimation,
    longAnimFadeInOutAnimation,
    AnimSlowFadeInOutAnimation
  ]
})
export class HeaderComponent implements OnInit {

  @Input() drawer:any;

  constructor(
    public router: Router,
    public appshell: AppshellService,
    public user: UserService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
  }

  async hideCatalog(drawer: MatSidenav) {
    var _self=this;
    if (_self.appshell._isHandset) {
      drawer.toggle();
    }

  }

}
