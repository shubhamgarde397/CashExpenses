import { Component, OnInit } from '@angular/core';
import { HandledataService } from '../../services/handleData/handledata.service';



@Component({
  selector: 'app-wallet-disp',
  templateUrl: './wallet-disp.component.html',
  styleUrls: ['./wallet-disp.component.css'],
  providers: [HandledataService]
})
export class WalletDispComponent implements OnInit {
  villageslist;
  show = false;
  found;
  arr;

  constructor(private handleservice: HandledataService) { }


  fetchData = function () {
    this.handleservice.getData('getCashExpenses')
      .subscribe((res: Response) => {
        this.cash_expenses = res.json();
      });
  };

  deleteVillageDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.handleservice.delete(id, 'deletevillagedatadetails')
        .subscribe((response: Response) => {
          this.fetchData();
        });
    }
  };

  back() {
    this.show = !this.show;
  }

  ngOnInit() {
    this.fetchData();
  }
}
