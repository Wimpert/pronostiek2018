import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronostiekComponent } from './pronostiek.component';

describe('PronostiekComponent', () => {
  let component: PronostiekComponent;
  let fixture: ComponentFixture<PronostiekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronostiekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronostiekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
