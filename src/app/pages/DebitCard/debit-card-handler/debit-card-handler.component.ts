import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-debit-card-handler',
  templateUrl: './debit-card-handler.component.html',
  styleUrls: ['./debit-card-handler.component.css']
})
export class DebitCardHandlerComponent implements OnInit {

  constructor(private location: Location) { }

  backClicked() {
    this.location.back();
  }
  ngOnInit() {
  }

}





