import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IconsService } from 'src/app/services/icons.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Customer } from '../../api/models';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent implements OnInit {

  // name: string = '';
  // email: string | undefined;
  // phoneNumber: string | undefined;
  // documentNumber: string | undefined; 
  user: Customer = {};

  constructor(public userSvc: UserService, public icons: IconsService, public dialogSvc: DialogService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  confirm() {
    this.userSvc.user = this.user;
    var ret = this.checkUser();
    if (ret) {
      this.showSnackBar("Fill in the field " + ret);
    } else {
      console.log(this.userSvc.user);
      this.dialogSvc.close(this.userSvc);
    }
  }

  checkUser() {
    var ret = '';
    if (!(this.user.name != undefined && this.user.name != '')) {
      ret = 'Name';
      return ret;
    }
    if (!(this.user.email != undefined && this.user.email != '')) {
      ret = 'email';
      return ret;
    }
    if (!(this.user.phoneNumber != undefined && this.user.phoneNumber != '')) {
      ret = 'phone';
      return ret;
    }
    if (!(this.user.documentNumber != undefined && this.user.documentNumber != '')) {
      ret = 'document';
      return ret;
    }
    return ret;
  }
  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  back() {
    this.dialogSvc.back();
  }

}
