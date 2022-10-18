import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchOrderTypeComponent } from './switch-order-type.component';

describe('SwitchOrderTypeComponent', () => {
  let component: SwitchOrderTypeComponent;
  let fixture: ComponentFixture<SwitchOrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchOrderTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
