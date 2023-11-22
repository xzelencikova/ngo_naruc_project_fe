import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFormComponent } from './change-form.component';

describe('ChangeFormComponent', () => {
  let component: ChangeFormComponent;
  let fixture: ComponentFixture<ChangeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeFormComponent]
    });
    fixture = TestBed.createComponent(ChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});