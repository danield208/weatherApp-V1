import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTodayComponent } from './current-today.component';

describe('CurrentTodayComponent', () => {
  let component: CurrentTodayComponent;
  let fixture: ComponentFixture<CurrentTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
