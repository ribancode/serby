import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCeProductComponent } from './add-ce-product.component';

describe('AddCeProductComponent', () => {
  let component: AddCeProductComponent;
  let fixture: ComponentFixture<AddCeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
