/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InfiniteListComponent } from './infinite-list.component';

describe('InfiniteListComponent', () => {
  let component: InfiniteListComponent;
  let fixture: ComponentFixture<InfiniteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
