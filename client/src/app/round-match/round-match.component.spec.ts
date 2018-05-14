import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundMatchComponent } from './round-match.component';

describe('RoundMatchComponent', () => {
  let component: RoundMatchComponent;
  let fixture: ComponentFixture<RoundMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
