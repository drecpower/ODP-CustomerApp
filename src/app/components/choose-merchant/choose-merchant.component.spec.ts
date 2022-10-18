import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMerchantComponent } from './choose-merchant.component';

describe('ChooseMerchantComponent', () => {
  let component: ChooseMerchantComponent;
  let fixture: ComponentFixture<ChooseMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
