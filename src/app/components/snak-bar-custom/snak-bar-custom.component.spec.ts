import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakBarCustomComponent } from './snak-bar-custom.component';

describe('SnakBarCustomComponent', () => {
  let component: SnakBarCustomComponent;
  let fixture: ComponentFixture<SnakBarCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakBarCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakBarCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
