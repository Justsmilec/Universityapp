import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentuserComponent } from './commentuser.component';

describe('CommentuserComponent', () => {
  let component: CommentuserComponent;
  let fixture: ComponentFixture<CommentuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
