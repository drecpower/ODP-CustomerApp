import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrEditAddressComponent } from './delete-or-edit-address.component';

describe('DeleteOrEditAddressComponent', () => {
  let component: DeleteOrEditAddressComponent;
  let fixture: ComponentFixture<DeleteOrEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrEditAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
