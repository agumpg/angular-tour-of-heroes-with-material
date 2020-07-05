import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchLogsComponent } from './switch-logs.component';

describe('SwitchLogsComponent', () => {
  let component: SwitchLogsComponent;
  let fixture: ComponentFixture<SwitchLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
