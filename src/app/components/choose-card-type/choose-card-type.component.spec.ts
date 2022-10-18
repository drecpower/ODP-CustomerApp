import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCardTypeComponent } from './choose-card-type.component';

describe('ChooseCardTypeComponent', () => {
  let component: ChooseCardTypeComponent;
  let fixture: ComponentFixture<ChooseCardTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCardTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
