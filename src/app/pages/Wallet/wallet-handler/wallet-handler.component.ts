import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wallet-handler',
  templateUrl: './wallet-handler.component.html',
  styleUrls: ['./wallet-handler.component.css']
})
export class WalletHandlerComponent implements OnInit {

  constructor(private location: Location) { }

  backClicked() {
    this.location.back();
  }
  ngOnInit() {
  }

}
