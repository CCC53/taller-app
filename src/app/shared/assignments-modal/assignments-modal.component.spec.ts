import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsModalComponent } from './assignments-modal.component';

describe('AssignmentsModalComponent', () => {
  let component: AssignmentsModalComponent;
  let fixture: ComponentFixture<AssignmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
