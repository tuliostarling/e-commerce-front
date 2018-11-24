import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessPaymentComponent } from './sucess-payment.component';

describe('SucessPaymentComponent', () => {
  let component: SucessPaymentComponent;
  let fixture: ComponentFixture<SucessPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
