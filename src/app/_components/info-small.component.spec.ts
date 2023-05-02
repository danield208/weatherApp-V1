import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSmallComponent } from './info-small.component';

describe('InfoSmallComponent', () => {
  let component: InfoSmallComponent;
  let fixture: ComponentFixture<InfoSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
