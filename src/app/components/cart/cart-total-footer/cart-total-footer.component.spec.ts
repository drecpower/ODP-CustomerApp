import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalFooterComponent } from './cart-total-footer.component';

describe('CartTotalFooterComponent', () => {
  let component: CartTotalFooterComponent;
  let fixture: ComponentFixture<CartTotalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartTotalFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTotalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
