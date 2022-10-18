import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconsService } from 'src/app/services/icons.service';
import { Location } from '@angular/common';
import { Address } from 'src/app/api/models/address';
import { UserService } from 'src/app/services/user.service';
import * as Enumerable from 'linq';
import { CartService } from 'src/app/services/cart.service';
import { GeocoderService } from 'src/app/services/geocoder/geocoder.service';
import { PostalCodeInfoService } from 'src/app/services/postal-code-info/postal-code-info.service';
import { ChooseStreetNumberComponent } from '../choose-street-number/choose-street-number.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { DeleteOrEditAddressComponent } from '../delete-or-edit-address/delete-or-edit-address.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressEditorComponent } from '../address-editor/address-editor.component';
import { FavoriteType } from 'src/enum/enums';
import { DtoDeliveryAddressResult } from 'src/app/services/delivery-address/dto-delivery-address-result';
import { DeliveryAddressService } from 'src/app/services/delivery-address/delivery-address.service';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';



@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.scss']
})
export class ChooseAddressComponent implements OnInit {

  selectedOption: string = "takeout";
  postalCode: string | undefined;
  geolocation: boolean = false;
  geolocationAllowed: boolean = false;
  gpsAddress: Address | undefined;
  needValidAddress: boolean | undefined;
  gettingPostalCodeInfo: boolean = false;

  selectedAddress: Address | undefined;
  geocoding: boolean = false;
  @Output() onChosedAddress = new EventEmitter();
  public modelChanged: Subject<string> = new Subject<string>();


  constructor(public cartSvc: CartService,
    public icons: IconsService,
    public userSvc: UserService,
    private location: Location,
    private router: Router,
    public dialogSvc: DialogService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { address: Address, needValidAddress: boolean },
    public svcPostalCodeService: PostalCodeInfoService, public geocoderSvc: GeocoderService, public deliveryAddressSvc: DeliveryAddressService
  ) {
    var _self = this;
    if (navigator.geolocation) {
      this.geolocation = true;
      navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        if (result.state == 'granted') {
          _self.geolocationAllowed = true;
          _self.getLocation(false);
        }
      });
    }
    this.modelChanged.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(model => { this.postalCode = model; this.getInfoPostalCode(); });
  }
  changed(text: string) {
    this.modelChanged.next(text);
  }
  ngOnInit(): void {
    console.log(this.userSvc.address);
    console.log("----------------");

    if (this.cartSvc.address) {
      this.selectedAddress = this.cartSvc.address;
    }
    if (this.data) {

      if (this.data.address != undefined) {
        this.userSvc.user = {}
        this.selectedAddress = this.data.address;
      }
      if (this.data.needValidAddress) {
        this.needValidAddress = true;
      }
    }
    if (this.userSvc.address && this.selectedAddress && this.cartSvc.address) {
      var address = Enumerable.from(this.userSvc.address).where(x => x.postalCode == this.cartSvc.address?.postalCode
        && x.streetNumber == this.cartSvc.address?.streetNumber && x.streetName == this.cartSvc.address?.streetName
      ).defaultIfEmpty().firstOrDefault();
      if (address) {
        var idx = this.userSvc.address.indexOf(address);
        if (idx >= 0) {
          this.userSvc.address.splice(idx, 1);
          this.userSvc.address.unshift(this.selectedAddress);
        }
      }
    }
  }
  back() {
    this.dialogSvc.back();
  }
  async useCurrentLocation() {
    var _self = this;
    if (_self.gpsAddress) {
      if (!this.needValidAddress) {
        var result: DtoDeliveryAddressResult = await _self.cartSvc.selectGpsAddress(_self.gpsAddress);
        if (result.deliverable) {
          _self.chosenAddress();
        } else {
          alert(result.message);
        }
      } else {
        _self.selectStreetNumber(_self.gpsAddress);
      }
    } else {
      this.getLocation(true);
    }
  }

  getLocation(fromClick: boolean = true) {
    try {
      var _self = this;
      _self.geocoding = true;
      navigator.geolocation.getCurrentPosition(function (d) {
        console.dir(d);
        _self.geocoderSvc.getAddressByLatLong(d.coords.latitude, d.coords.longitude).then(function (gpsAddress) {
          if (gpsAddress) {
            gpsAddress.streetNumber = undefined;
            _self.gpsAddress = gpsAddress;
          }
        }).finally(function () {
          _self.geocoding = false;
        });
      },
        function (e) {
          console.dir(e);
          _self.geocoding = false;
          if (fromClick) {
            if (e.code == e.PERMISSION_DENIED) {
              alert("Location Denied");
            } else if (e.code == e.POSITION_UNAVAILABLE) {
              alert("Location Unavailable");
            }
          }
        });
    } catch (error) {

    }
  }
  getInfoPostalCode() {
    var _self = this;
    if (this.postalCode && this.postalCode.length >= 8)
      this.gettingPostalCodeInfo = true;
    this.svcPostalCodeService.getPostalCode(this.postalCode).then(function (d) {
      if (d.postalCode) {
        _self.selectStreetNumber(d);
      } else {
        _self.showSnackBar("Zip Code Not Found");
      }
    }).finally(function () {
      _self.gettingPostalCodeInfo = false;
    });
  }

  async selectAddress(data: Address) {
    this.postalCode = "";
    console.log("selectAddress");
    var ret = await this.cartSvc.selectAddress(data);
    if (ret.deliverable) {
      this.selectedAddress = data;
      this.userSvc.addAddress(data);
      this.chosenAddress();
    } else {
      this.showSnackBar("This store does not work at this address.");
    }
  }
  chosenAddress() {
    if (this.onChosedAddress) {
      this.onChosedAddress.emit();
    }
    if (this.data) {
      this.dialogSvc.back();
    }
  }
  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  selectStreetNumber(data: Address) {
    var bottomSheet: DtoDialog = {
      type: DialogType.MAT_BOTTOM_SHEET,
      component: ChooseStreetNumberComponent,
      data: data,
      closeOnNavigation: false
    };
    var bottomSheetRef = this.dialogSvc.open(bottomSheet);
    bottomSheetRef.afterDismissed().subscribe(
      (ok: any) => {
        if (ok) {
          var ret = this.deliveryAddressSvc.checkAddress(data);;
          if (ret.deliverable) {
            if (ok == "WITHOUT_STREET_NUMBER") {
              data.withotStreetNumber = true;
            } else {
              data.streetNumber = ok;
            }
            this.tempEditAddress(data);
          } else {
            this.showSnackBar("This store does not work at this address.");
          }
        }
      },
      (err: any) => {
      }
    );
  }

  edit(address: Address) {
    var dialog: DtoDialog = {
      type: DialogType.MAT_BOTTOM_SHEET,
      component: DeleteOrEditAddressComponent,
      data: address,
      closeOnNavigation: false
    };
    var dialogRef = this.dialogSvc.open(dialog);
    dialogRef.afterDismissed().subscribe(
      (d: any) => {
        if (d == "DELETE") {
          if (this.selectedAddress == address) {
            this.showSnackBar('You cannot delete the address you are currently using');
          } else {
            this.userSvc.removeAddress(address);
          }
        } else if (d == "EDIT") {
          this.tempEditAddress(address)
        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    );

  }

  //TODO: Temporary method, remove it when map lettering is done
  tempEditAddress(address: Address) {
    var dialogRef = this.dialogSvc.open({
      type: DialogType.MAT_DIALOG,
      component: AddressEditorComponent,
      data: address,
      closeOnNavigation: false
    });
    dialogRef.afterClosed().subscribe(
      (d: any) => {
        if (d) {
          if (this.userSvc.address && this.userSvc.address.indexOf(address) >= 0) {
            console.log("Update");
            this.userSvc.updateAddress(d, address);
          } else {
            this.selectAddress(d);
            console.log("addAd");
          }
        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    )
  }

  checkFavorite(type: string | undefined) {
    var ret = false;
    if (type == FavoriteType.HOME || type == FavoriteType.WORK) {
      ret = true;
    }
    return ret;
  }

  capitalizeFirstLetter(type: string | undefined) {
    var ret = "";
    if (type) {
      ret = type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
    }
    return ret;
  }

}
