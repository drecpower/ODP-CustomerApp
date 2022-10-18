import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartValuesComponent } from './cart-values.component';

describe('CartValuesComponent', () => {
  let component: CartValuesComponent;
  let fixture: ComponentFixture<CartValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
