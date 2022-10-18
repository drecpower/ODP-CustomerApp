import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDeliveryTimeWindowComponent } from './choose-delivery-time-window.component';

describe('ChooseDeliveryTimeWindowComponent', () => {
  let component: ChooseDeliveryTimeWindowComponent;
  let fixture: ComponentFixture<ChooseDeliveryTimeWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDeliveryTimeWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDeliveryTimeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
