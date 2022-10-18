import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePaymentComponent } from './page-payment.component';

describe('PagePaymentComponent', () => {
  let component: PagePaymentComponent;
  let fixture: ComponentFixture<PagePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
