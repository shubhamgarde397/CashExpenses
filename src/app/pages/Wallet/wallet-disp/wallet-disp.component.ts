import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../services/handleData/ApiCalls.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-wallet-disp',
  templateUrl: './wallet-disp.component.html',
  styleUrls: ['./wallet-disp.component.css'],
  providers: [ApiCallsService]
})
export class WalletDispComponent implements OnInit {
  private show = false;
  private Wallet: number;
  private WalletMoney: number;
  private newAuthor: any;

  constructor(private handleservice: ApiCallsService) { }

  fetchData = function () {
    this.handleservice.handleData('Wallet/getCashExpenses', 0, 0)
      .subscribe((res: Response) => {
        this.cash_expenses = res.json();
      });
  };

  fetchWallet = function () {
    this.handleservice.handleData('Wallet/Wallet', 0, 0)
      .subscribe((res: Response) => {
        this.Wallet = res.json();
        this.WalletMoney = this.Wallet[0].Money;
      });
  }

  back() {
    this.show = !this.show;
  }

  ngOnInit() {
    this.fetchData();
    this.fetchWallet();
  }

  download() {
    this.newAuthor = this.handleservice.handleData('Wallet/getCashExpenses', 0, 0)
      .subscribe((res: Response) => {
        console.log(res.json());
        this.newAuthor = res.json();
        var rows = [];
        var columns = [
          { title: "Srno", dataKey: "no" },
          { title: "Date", dataKey: "date" },
          { title: "Category", dataKey: "cat" },
          { title: "SubCategory", dataKey: "subcat" },
          { title: "Deposit", dataKey: "dep" },
          { title: "Withdraw", dataKey: "with" },
        ];

        var doc = new jsPDF('p', 'pt');
        doc.text("CASH EXPENSES DETAILS");
        var i = 1;
        for (var key in this.newAuthor) {
          rows = [...rows, Object.assign({}, {
            "no": i, "date": this.newAuthor[key].Date, "cat": this.newAuthor[key].Category, "subcat": this.newAuthor[key].SubCategory,
            "dep": this.newAuthor[key].Deposit, "with": this.newAuthor[key].Withdraw
          })];
          i++;
        }
        doc.autoTable(columns, rows);
        doc.save('table.pdf');
      });
  }
}
