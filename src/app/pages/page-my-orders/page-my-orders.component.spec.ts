import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyOrdersComponent } from './page-my-orders.component';

describe('PageMyOrdersComponent', () => {
  let component: PageMyOrdersComponent;
  let fixture: ComponentFixture<PageMyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMyOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
