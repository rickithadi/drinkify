import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonezoComponent } from './donezo.component';

describe('DonezoComponent', () => {
  let component: DonezoComponent;
  let fixture: ComponentFixture<DonezoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonezoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonezoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
