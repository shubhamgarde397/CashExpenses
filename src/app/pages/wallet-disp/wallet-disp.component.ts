import { Component, OnInit } from '@angular/core';
import { HandledataService } from '../../services/handleData/handledata.service';
// var jspdf = require('jspdf');
// import { jsPDF } from 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';



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
  newAuthor: any;

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

  download() {

    // this.newAuthor = this.fetchData();
    this.newAuthor = this.handleservice.getData('getCashExpenses')
      .subscribe((res: Response) => {
        this.newAuthor = res.json();

        var rows = [];
        var columns = [
          { title: "Srno", dataKey: "no" },
          { title: "Date", dataKey: "date" },
          { title: "Description", dataKey: "desc" },
          { title: "Deposit", dataKey: "dep" },
          { title: "Withdraw", dataKey: "with" },
        ];

        var doc = new jsPDF('p', 'pt');
        var i = 1;
        for (var key in this.newAuthor) {
          rows = [...rows, Object.assign({}, {
            "no": i, "date": this.newAuthor[key].Date, "desc": this.newAuthor[key].Description,
            "dep": this.newAuthor[key].Deposit, "with": this.newAuthor[key].Withdraw
          })];
          i++;
        }
        doc.text("CASH EXPENSES DETAILS");
        doc.autoTable(columns, rows);
        doc.save('table.pdf');

      });


  }
}
