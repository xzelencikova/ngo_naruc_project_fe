import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentMessageComponent } from './sent-message.component';

describe('SentMessageComponent', () => {
  let component: SentMessageComponent;
  let fixture: ComponentFixture<SentMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentMessageComponent]
    });
    fixture = TestBed.createComponent(SentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
