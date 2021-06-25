import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsingleElementComponent } from './friendsingle-element.component';

describe('FriendsingleElementComponent', () => {
  let component: FriendsingleElementComponent;
  let fixture: ComponentFixture<FriendsingleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsingleElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsingleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
