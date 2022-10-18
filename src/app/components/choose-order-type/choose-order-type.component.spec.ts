import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOrderTypeComponent } from './choose-order-type.component';

describe('ChooseOrderTypeComponent', () => {
  let component: ChooseOrderTypeComponent;
  let fixture: ComponentFixture<ChooseOrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseOrderTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
