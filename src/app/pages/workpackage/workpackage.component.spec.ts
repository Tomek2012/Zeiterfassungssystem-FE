import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackageComponent } from './workpackage.component';

describe('WorkpackageComponent', () => {
  let component: WorkpackageComponent;
  let fixture: ComponentFixture<WorkpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkpackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
