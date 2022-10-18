import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemOptionGroupComponent } from './catalog-item-option-group.component';

describe('CatalogItemOptionGroupComponent', () => {
  let component: CatalogItemOptionGroupComponent;
  let fixture: ComponentFixture<CatalogItemOptionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogItemOptionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogItemOptionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
