import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBuyTooComponent } from './cart-buy-too.component';

describe('CartBuyTooComponent', () => {
  let component: CartBuyTooComponent;
  let fixture: ComponentFixture<CartBuyTooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartBuyTooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBuyTooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
