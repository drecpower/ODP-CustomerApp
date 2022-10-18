import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAddressTakeoutComponent } from './choose-address-takeout.component';

describe('ChooseAddressTakeoutComponent', () => {
  let component: ChooseAddressTakeoutComponent;
  let fixture: ComponentFixture<ChooseAddressTakeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAddressTakeoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAddressTakeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
