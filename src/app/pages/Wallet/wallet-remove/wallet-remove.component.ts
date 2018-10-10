import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../services/handleData/ApiCalls.service';
import { wallet } from './wallet';
import { Consts } from "../../../utils/common/constants/const";
import { FormsModule } from "@angular/forms";
import { Location } from '@angular/common';

@Component({
  selector: 'app-wallet-remove',
  templateUrl: './wallet-remove.component.html',
  styleUrls: ['./wallet-remove.component.css'],
  providers: [ApiCallsService]
})
export class WalletRemoveComponent implements OnInit {
  WalletMoney: any;
  Wallet: any;
  myFormGroup: FormGroup;
  model: wallet;//mapped it to a variable
  submitted = false;

  response: any;
  private Flag: any;
  private Date: Date;
  private Category: string;
  private SubCategory: string;
  private Withdraw: number;
  private categorylist: any;


  constructor(private router: Router, private handleservice: ApiCallsService, private http: Http, private formBuilder: FormBuilder, private _location: Location) { }
  name: string;
  ngOnInit() {
    this.model = new wallet(this.Date, this.Category, this.SubCategory, this.Withdraw, this.Flag);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, Validators.required],
      Category: [this.model.Category, [Validators.required, Validators.pattern("^[a-zA-Z]*")]],
      SubCategory: [this.model.SubCategory, [Validators.required, Validators.pattern("^[a-zA-Z]*")]],
      Withdraw: [this.model.Withdraw, Validators.required]
    });

    this.handleservice.handleData('Wallet/getcategorydata', 0, 0)
      .subscribe((res: Response) => {
        this.categorylist = res.json();
      });

    this.fetchWallet();
  }

  backClicked() {
    this._location.back();
  }

  fetchWallet = function () {
    this.handleservice.handleData('Wallet/Wallet', 0, 0)
      .subscribe((res: Response) => {

        this.Wallet = res.json();
        this.WalletMoney = this.Wallet[0].Money;

      });
  }

  storeWalletExpenses({ value, valid }: { value: wallet, valid: boolean }) {

    this.handleservice.handleData('Wallet/Wallet', 0, 0)
      .subscribe((res: Response) => {
        this.Wallet = res.json();
        this.WalletMoney = this.Wallet[0].Money;
        if (this.WalletMoney > 0 && this.WalletMoney >= value.Withdraw) {
          value.Flag = 'W';
          this.submitted = true;
          this.handleservice.handleData('Wallet/addWalletExpenses', 1, 0, value).subscribe(x => this.response = x);//old
          this.handleservice.handleData('Wallet/Wallet', 1, 1, value, 'remove')
            .subscribe(x => {
              this.response = x;
              this._location.back();
            });//old
        }
        else {
          // alert("Money too Low! Go Get A Job! And Feed me!");
          alert("Remove correct amount of money,Please try again!");
        }
      });



  }
  back() {
    this.submitted = !this.submitted;
  }
}
