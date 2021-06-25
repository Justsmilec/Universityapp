import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegeComponent } from './dege.component';

describe('DegeComponent', () => {
  let component: DegeComponent;
  let fixture: ComponentFixture<DegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
