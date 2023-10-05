import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireSentPage } from './questionnaire-sent.page';

describe('QuestionnaireSentPage', () => {
  let component: QuestionnaireSentPage;
  let fixture: ComponentFixture<QuestionnaireSentPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireSentPage]
    });
    fixture = TestBed.createComponent(QuestionnaireSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
