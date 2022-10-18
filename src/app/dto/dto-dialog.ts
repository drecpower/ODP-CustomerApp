import { ComponentType } from "@angular/cdk/portal";

export enum DialogType{
    MAT_DIALOG,
    MAT_BOTTOM_SHEET
}
export interface  DtoDialog {
    closeOnNavigation: false
    type:DialogType;
    component: ComponentType<any>;
    data?:any;
    instance?:any;
}
