import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartChooseTimeComponent } from './cart-choose-time.component';

describe('CartChooseTimeComponent', () => {
  let component: CartChooseTimeComponent;
  let fixture: ComponentFixture<CartChooseTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartChooseTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartChooseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
