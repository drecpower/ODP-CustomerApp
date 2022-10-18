import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSendSplashComponent } from './cart-send-splash.component';

describe('CartSendSplashComponent', () => {
  let component: CartSendSplashComponent;
  let fixture: ComponentFixture<CartSendSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSendSplashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSendSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
