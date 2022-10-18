import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPizzaComponent } from './catalog-pizza.component';

describe('CatalogPizzaComponent', () => {
  let component: CatalogPizzaComponent;
  let fixture: ComponentFixture<CatalogPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPizzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
