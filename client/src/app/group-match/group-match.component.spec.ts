import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMatchComponent } from './group-match.component';

describe('GroupMatchComponent', () => {
  let component: GroupMatchComponent;
  let fixture: ComponentFixture<GroupMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
