import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartChooseAddressComponent } from './cart-choose-address.component';

describe('CartChooseAddressComponent', () => {
  let component: CartChooseAddressComponent;
  let fixture: ComponentFixture<CartChooseAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartChooseAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartChooseAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
