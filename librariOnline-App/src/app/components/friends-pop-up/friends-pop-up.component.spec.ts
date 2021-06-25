import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPopUpComponent } from './friends-pop-up.component';

describe('FriendsPopUpComponent', () => {
  let component: FriendsPopUpComponent;
  let fixture: ComponentFixture<FriendsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
