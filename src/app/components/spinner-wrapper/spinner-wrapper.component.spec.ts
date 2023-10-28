import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerWrapperComponent } from './spinner-wrapper.component';

describe('SpinnerWrapperComponent', () => {
  let component: SpinnerWrapperComponent;
  let fixture: ComponentFixture<SpinnerWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerWrapperComponent]
    });
    fixture = TestBed.createComponent(SpinnerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
