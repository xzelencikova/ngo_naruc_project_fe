import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionFormComponent } from './add-question-form.component';

describe('AddQuestionFormComponent', () => {
  let component: AddQuestionFormComponent;
  let fixture: ComponentFixture<AddQuestionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionFormComponent]
    });
    fixture = TestBed.createComponent(AddQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
