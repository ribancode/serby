import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeSubcategoriesComponent } from './ce-subcategories.component';

describe('CeSubcategoriesComponent', () => {
  let component: CeSubcategoriesComponent;
  let fixture: ComponentFixture<CeSubcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeSubcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
