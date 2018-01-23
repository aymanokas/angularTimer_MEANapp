import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GobackdudeComponent } from './gobackdude.component';

describe('GobackdudeComponent', () => {
  let component: GobackdudeComponent;
  let fixture: ComponentFixture<GobackdudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GobackdudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GobackdudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
