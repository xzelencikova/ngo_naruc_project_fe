import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryModalWindowComponent } from './history-modal-window.component';

describe('HistoryModalWindowComponent', () => {
  let component: HistoryModalWindowComponent;
  let fixture: ComponentFixture<HistoryModalWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryModalWindowComponent]
    });
    fixture = TestBed.createComponent(HistoryModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
