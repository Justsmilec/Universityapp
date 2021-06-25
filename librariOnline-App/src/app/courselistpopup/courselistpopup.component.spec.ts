import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourselistpopupComponent } from './courselistpopup.component';

describe('CourselistpopupComponent', () => {
  let component: CourselistpopupComponent;
  let fixture: ComponentFixture<CourselistpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourselistpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourselistpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
