import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePaymentByAppComponent } from './choose-payment-by-app.component';

describe('ChoosePaymentByAppComponent', () => {
  let component: ChoosePaymentByAppComponent;
  let fixture: ComponentFixture<ChoosePaymentByAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePaymentByAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePaymentByAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
