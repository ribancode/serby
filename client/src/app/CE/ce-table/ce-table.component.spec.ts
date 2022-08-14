import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeTableComponent } from './ce-table.component';
import { MatTableModule } from '@angular/material';

describe('CeTableComponent', () => {
  let component: CeTableComponent;
  let fixture: ComponentFixture<CeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeTableComponent ],
      imports: [ MatTableModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
