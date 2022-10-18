import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAddressDeliveryComponent } from './choose-address-delivery.component';

describe('ChooseAddressDeliveryComponent', () => {
  let component: ChooseAddressDeliveryComponent;
  let fixture: ComponentFixture<ChooseAddressDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAddressDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAddressDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
