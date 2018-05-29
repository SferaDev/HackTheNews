import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarceComponent } from './toolbarce.component';

describe('ToolbarceComponent', () => {
  let component: ToolbarceComponent;
  let fixture: ComponentFixture<ToolbarceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
