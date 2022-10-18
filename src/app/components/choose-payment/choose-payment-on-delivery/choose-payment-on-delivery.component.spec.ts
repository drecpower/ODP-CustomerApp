import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePaymentOnDeliveryComponent } from './choose-payment-on-delivery.component';

describe('ChoosePaymentOnDeliveryComponent', () => {
  let component: ChoosePaymentOnDeliveryComponent;
  let fixture: ComponentFixture<ChoosePaymentOnDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePaymentOnDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePaymentOnDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
