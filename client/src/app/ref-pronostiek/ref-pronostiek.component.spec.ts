import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefPronostiekComponent } from './ref-pronostiek.component';

describe('RefPronostiekComponent', () => {
  let component: RefPronostiekComponent;
  let fixture: ComponentFixture<RefPronostiekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefPronostiekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefPronostiekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
