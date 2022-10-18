import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPizzaDetailComponent } from './catalog-pizza-detail.component';

describe('CatalogPizzaDetailComponent', () => {
  let component: CatalogPizzaDetailComponent;
  let fixture: ComponentFixture<CatalogPizzaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPizzaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPizzaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
