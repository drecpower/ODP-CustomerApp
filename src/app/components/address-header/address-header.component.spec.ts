import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressHeaderComponent } from './address-header.component';

describe('AddressHeaderComponent', () => {
  let component: AddressHeaderComponent;
  let fixture: ComponentFixture<AddressHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
