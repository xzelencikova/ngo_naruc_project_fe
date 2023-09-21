import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesProgressbarComponent } from './phases-progressbar.component';

describe('PhasesProgressbarComponent', () => {
  let component: PhasesProgressbarComponent;
  let fixture: ComponentFixture<PhasesProgressbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhasesProgressbarComponent]
    });
    fixture = TestBed.createComponent(PhasesProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
