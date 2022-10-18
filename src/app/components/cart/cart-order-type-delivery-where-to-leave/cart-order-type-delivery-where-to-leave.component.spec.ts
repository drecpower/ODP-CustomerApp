import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderTypeDeliveryWhereToLeaveComponent } from './cart-order-type-delivery-where-to-leave.component';

describe('CartOrderTypeDeliveryWhereToLeaveComponent', () => {
  let component: CartOrderTypeDeliveryWhereToLeaveComponent;
  let fixture: ComponentFixture<CartOrderTypeDeliveryWhereToLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOrderTypeDeliveryWhereToLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartOrderTypeDeliveryWhereToLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
