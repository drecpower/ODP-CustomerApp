import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFooterComponent } from './catalog-footer.component';

describe('CatalogFooterComponent', () => {
  let component: CatalogFooterComponent;
  let fixture: ComponentFixture<CatalogFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
