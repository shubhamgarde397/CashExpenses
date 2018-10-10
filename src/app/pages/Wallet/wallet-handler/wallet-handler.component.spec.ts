import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletHandlerComponent } from './wallet-handler.component';

describe('WalletHandlerComponent', () => {
  let component: WalletHandlerComponent;
  let fixture: ComponentFixture<WalletHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
