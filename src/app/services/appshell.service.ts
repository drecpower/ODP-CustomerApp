import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { elementAt, map, Observable, shareReplay, Subject } from 'rxjs';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { MerchantGroup } from '../api/models';
import { ManifestService } from './manifest.service';
import { DataService } from './data/data.service';
import { DialogService } from './dialog/dialog.service';
import { ChooseOrderTypeComponent } from '../components/choose-order-type/choose-order-type.component';
import { DtoDialog } from '../dto/dto-dialog';
import { SelectedService } from './selected/selected.service';

@Injectable({
  providedIn: 'root'
})
export class AppshellService {
  private _title = "OdpCustomerApp";
  public version = "0.0.1";

  private _isSystemReady = new Subject<boolean>();
  public isSystemReadyAsync: Observable<boolean> = this._isSystemReady.asObservable();

  constructor(
    private breakpointObserver: BreakpointObserver,
    public selectedSvc: SelectedService

  ) {
    var _self = this;
    //console.log("AppShell initiated");
    try {
      document.getElementById("loading_application")?.remove();
    } catch (error) {
      
    }
    
    setTimeout(() => {
      localStorage.setItem("odp_customer_app_loaded", "true");
      this._isSystemReady.next(false);
    }, 1);
    this.selectedSvc.onSelectMerchantGroup.subscribe(d => {
      _self.checkIfIsReady();
    })
  }

  private _onTitleUpdateSubject = new Subject<string>();
  public onTitleUpdate = this._onTitleUpdateSubject.asObservable();
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
    this._onTitleUpdateSubject.next(value);
  }
  checkIfIsReady() {
    var _self = this;
    var ready = false;
    if (this.selectedSvc.selectedMerchantGroup != undefined) {
      setTimeout(() => {
        
        _self._isSystemReady.next(true);
      }, 1);
    }
    return ready;
  }
  public tst() {
    localStorage.clear();
    setTimeout(() => {
      location.reload();
    }, 500);
    // this.dataSvc.tst();
  }

  _isHandset = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
