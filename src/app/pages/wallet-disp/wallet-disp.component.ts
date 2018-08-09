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
  public Wallet: number;
  public WalletMoney: number;

  constructor(private handleservice: HandledataService) { }


  fetchData = function () {
    this.handleservice.getData('getCashExpenses')
      .subscribe((res: Response) => {
        this.cash_expenses = res.json();
      });
  };

  fetchWallet = function () {
    this.handleservice.getData('Wallet')
      .subscribe((res: Response) => {

        this.Wallet = res.json();
        this.WalletMoney = this.Wallet[0].Money;

      });
  }

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
    this.fetchWallet();

  }
}
