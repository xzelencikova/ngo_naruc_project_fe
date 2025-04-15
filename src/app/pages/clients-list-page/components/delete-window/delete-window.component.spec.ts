import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientWindowComponent } from './delete-window.component';

describe('ModalWindowComponent', () => {
  let component: DeleteClientWindowComponent;
  let fixture: ComponentFixture<DeleteClientWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteClientWindowComponent]
    });
    fixture = TestBed.createComponent(DeleteClientWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
