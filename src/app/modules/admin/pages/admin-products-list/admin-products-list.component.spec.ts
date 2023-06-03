import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsListComponent } from './admin-products-list.component';

describe('AdminProductsListComponent', () => {
  let component: AdminProductsListComponent;
  let fixture: ComponentFixture<AdminProductsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductsListComponent]
    });
    fixture = TestBed.createComponent(AdminProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
