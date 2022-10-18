import { PaymentMethod } from "../api/models";

export class DtoPaymentOnDelivery {
    groupName?: string;
    items:PaymentMethod[]=[];
  }
  