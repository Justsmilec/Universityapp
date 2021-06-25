import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserpostComponent } from './single-userpost.component';

describe('SingleUserpostComponent', () => {
  let component: SingleUserpostComponent;
  let fixture: ComponentFixture<SingleUserpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleUserpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
