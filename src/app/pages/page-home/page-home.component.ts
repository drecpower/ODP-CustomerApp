import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppshellService } from '../../services/appshell.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { animFadeInOutAnimation, animFastFadeInOutAnimation, animRouteTransition, AnimSlowFadeInOutAnimation, longAnimFadeInOutAnimation } from '../../shared/animations';
import { IconsService } from 'src/app/services/icons.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { CardComponent } from 'src/app/components/card/card.component';
import { CustomerEditorComponent } from 'src/app/components/customer-editor/customer-editor.component';
import { ChooseMerchantComponent } from 'src/app/components/choose-merchant/choose-merchant.component';
import { ChooseOrderTypeComponent } from 'src/app/components/choose-order-type/choose-order-type.component';


@Component({ 
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
  animations: [
    animFadeInOutAnimation,
    animRouteTransition,
    animFastFadeInOutAnimation,
    longAnimFadeInOutAnimation,
    AnimSlowFadeInOutAnimation
  ]
})
export class PageHomeComponent implements OnInit {

  constructor(
    public router: Router,
    public appshell: AppshellService,
    public user: UserService,
    private breakpointObserver: BreakpointObserver,
    public icons:IconsService,
    public dialogSvc: DialogService,

  ) { }

  ngOnInit(): void {
  }

  confirm(){
    var dialog :DtoDialog={
      type: DialogType.MAT_DIALOG,
      component: CustomerEditorComponent,
      closeOnNavigation:false
    };
    var dialogRef = this.dialogSvc.open(dialog);
    dialogRef.afterClosed().subscribe(
      (d:any) => {
        if (d) {
          console.log("dados: "); 
          console.log(d);
        }
      },
      (err:any) => {
        //console.log("err: " + err)
      }
    )
  }

  open(){
    var dialog :DtoDialog={
      type: DialogType.MAT_DIALOG,
      component: ChooseOrderTypeComponent,
      closeOnNavigation:false
    };
    var dialogRef = this.dialogSvc.open(dialog);
    dialogRef.afterClosed().subscribe(
      (d:any) => {
        if (d) {
          this.test();
        }
      },
      (err:any) => {
        //console.log("err: " + err)
      }
    )
  }

  test(){
    alert("g=teste");
  }

  async hideCatalog(drawer: MatSidenav) {
    var _self=this;
    if (_self.appshell._isHandset) {
      drawer.toggle();
    }
  }

  goCatalog(){
    this.router.navigateByUrl("/catalog");

  }
}
