import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectpostdetailsComponent } from './subjectpostdetails.component';

describe('SubjectpostdetailsComponent', () => {
  let component: SubjectpostdetailsComponent;
  let fixture: ComponentFixture<SubjectpostdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectpostdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectpostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
