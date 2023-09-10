/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductChipComponent } from './product-chip.component';

describe('ProductChipComponent', () => {
  let component: ProductChipComponent;
  let fixture: ComponentFixture<ProductChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
