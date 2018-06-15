import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRoundComponent } from './overview-round.component';

describe('OverviewRoundComponent', () => {
  let component: OverviewRoundComponent;
  let fixture: ComponentFixture<OverviewRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
