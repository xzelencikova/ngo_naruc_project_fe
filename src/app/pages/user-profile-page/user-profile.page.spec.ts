import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePage } from './user-profile.page';

describe('UserManagementPage', () => {
  let component: UserProfilePage;
  let fixture: ComponentFixture<UserProfilePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfilePage]
    });
    fixture = TestBed.createComponent(UserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
