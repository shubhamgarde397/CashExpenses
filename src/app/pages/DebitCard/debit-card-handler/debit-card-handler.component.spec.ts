import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCardHandlerComponent } from './debit-card-handler.component';

describe('DebitCardHandlerComponent', () => {
  let component: DebitCardHandlerComponent;
  let fixture: ComponentFixture<DebitCardHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitCardHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitCardHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
