import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbNumberDocsComponent } from './db-number-docs.component';

describe('DbNumberDocsComponent', () => {
  let component: DbNumberDocsComponent;
  let fixture: ComponentFixture<DbNumberDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbNumberDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbNumberDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
