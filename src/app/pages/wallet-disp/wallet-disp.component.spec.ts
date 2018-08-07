import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDispComponent } from './wallet-disp.component';

describe('WalletDispComponent', () => {
  let component: WalletDispComponent;
  let fixture: ComponentFixture<WalletDispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletDispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
