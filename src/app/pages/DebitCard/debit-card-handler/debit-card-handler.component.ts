import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-debit-card-handler',
  templateUrl: './debit-card-handler.component.html',
  styleUrls: ['./debit-card-handler.component.css']
})
export class DebitCardHandlerComponent implements OnInit {

  constructor(private router: Router) { }

  backClicked() {
    this.router.navigate(['Navigation']);
  }
  ngOnInit() {
  }

}





