import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseStreetNumberComponent } from './choose-street-number.component';

describe('ChooseStreetNumberComponent', () => {
  let component: ChooseStreetNumberComponent;
  let fixture: ComponentFixture<ChooseStreetNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseStreetNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseStreetNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
