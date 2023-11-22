import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsListPage } from './questions-list.page';

describe('QuestionsListPage', () => {
  let component: QuestionsListPage;
  let fixture: ComponentFixture<QuestionsListPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsListPage]
    });
    fixture = TestBed.createComponent(QuestionsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
