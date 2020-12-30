import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroperComponent } from './croper.component';

describe('CroperComponent', () => {
  let component: CroperComponent;
  let fixture: ComponentFixture<CroperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
