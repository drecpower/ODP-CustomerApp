import { ComponentType } from '@angular/cdk/portal';
import { HostListener, Injectable, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';

@Injectable({
  providedIn: 'root'
})
// This service was created to manage the opening and closing of dialogs.

// So when the user clicks back from the browser, we can just close the dialog without going back in the route.
// the same for when he clicks on the backdrop.
// And Obviously when you click the action button it should close it

// Whenever the back()/close() method is called the last open dialog/bottomsheet will be closed.
export class DialogService {

  constructor(public dialog: MatDialog, public bottomSheet: MatBottomSheet) { }
  list: DtoDialog[] = [];
  public static MAT_BOTTOM_SHEET: string = "MAT_BOTTOM_SHEET";
  public static MAT_DIALOG: string = "MAT_DIALOG";
  ignoreBack: number = 0;
  ignoreBackCloseAll: number = 0;
  open(dialog: DtoDialog) {
    var _self = this;
    var dialogRef: any;
    const modalState = {
      modal: true,
      desc: 'modal'
    };
    (<any>history).pushState(modalState, null);
    console.warn('push state ' + dialog.component.name);
    if (dialog.type == DialogType.MAT_DIALOG) {
      dialogRef = this.dialog.open(dialog.component, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        data: dialog.data,
        closeOnNavigation: false,
        disableClose: true
      });
      dialog.instance = dialogRef;
    } else if (dialog.type == DialogType.MAT_BOTTOM_SHEET) {
      dialogRef = this.bottomSheet.open(dialog.component, {
        data: dialog.data,
        closeOnNavigation: false,
        disableClose: true
      });
      dialog.instance = dialogRef;
      setTimeout(function () {
        try {
          var obj = document!.querySelectorAll("div.cdk-overlay-container > div.cdk-overlay-backdrop.cdk-overlay-dark-backdrop.cdk-overlay-backdrop-showing");
          console.log(obj);
          if (obj) {
            obj.forEach(function (d) {
              d.addEventListener("click", function () {
                _self.back();
              }
                , false)
            });
          }
        } catch (error) {
        }
      }, 800)
    }
    if (dialog.instance) {
      this.list.push(dialog)
    }
    return dialogRef;
  }
  openWithPromisse(dialog: DtoDialog) {
    var _self = this;
    return new Promise<any>(
      (resolve, reject) => {
        var d = _self.open(dialog);
        d.dialogRef.afterClosed().subscribe(
          (d: any) => {
            resolve(d);
          },
          (err: any) => {
            reject(err);
            //console.log("err: " + err)
          }
        )
      }
    );
  }
  closeHostListener() {
    console.log('closeHostListener()')
    if (this.ignoreBack > 0) {
      this.ignoreBack--;
      console.log('this.ignoreBack--')
    } else {
      this.close(undefined, false);
    }
  }
  back() {
    console.log("back1");
    setTimeout(function () {
      history.back();
    }
    );
  }
  close(data?: any, doBack: boolean = true) {
    var back = true;
    console.warn("dialog service close()");
    try {
      if (this.list && this.list.length > 0) {
        back = false
      }
      var index = this.list.length - 1;
      var dialog = this.list[index];
      if (dialog.type == DialogType.MAT_DIALOG) {
        dialog.instance.close(data);

      } else if (dialog.type == DialogType.MAT_BOTTOM_SHEET) {
        dialog.instance.dismiss(data);
      }
      this.list.splice(index, 1);
      if (doBack) {
        this.ignoreBack++;
        // this.ignoreBackCloseAll++;
        history.back()
      }
    } catch (error) {

    }
    return back;
  }
  closeAll() {
    // if (this.ignoreBackCloseAll > 0) {
    //   this.ignoreBackCloseAll=0;
    //   console.log('this.ignoreBackCloseAll--')
    // } else {
      for (let index = this.list.length - 1; index >= 0; index--) {
        const element = this.list[index];
        this.closeDialog(element, index);
        console.log('closeDialog')
      }
    // }

  }
  private closeDialog(dialog: DtoDialog, index: number) {
    if (dialog.type == DialogType.MAT_DIALOG) {
      dialog.instance.close();
    } else if (dialog.type == DialogType.MAT_BOTTOM_SHEET) {
      dialog.instance.dismiss();
    }
    this.list.splice(index, 1);
    try {
      // if (window.history.state.modal) {
      //   this.ignoreBack++;
      //   history.back();
      //   console.log('closeDialog() back');
      // }
    } catch (error) { }
  }

}
