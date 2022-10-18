import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderTypeComponent } from './cart-order-type.component';

describe('CartOrderTypeComponent', () => {
  let component: CartOrderTypeComponent;
  let fixture: ComponentFixture<CartOrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOrderTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
