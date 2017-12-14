import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAwesomeComponent } from './card-awesome.component';

describe('CardAwesomeComponent', () => {
  let component: CardAwesomeComponent;
  let fixture: ComponentFixture<CardAwesomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAwesomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAwesomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
