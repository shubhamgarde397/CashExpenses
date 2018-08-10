import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandledataService } from '../../services/handleData/handledata.service';
import { wallet } from './wallet';
import { Consts } from "../../utils/common/constants/const";
import { FormsModule } from "@angular/forms";
import { Location } from '@angular/common';

@Component({
  selector: 'app-wallet-remove',
  templateUrl: './wallet-remove.component.html',
  styleUrls: ['./wallet-remove.component.css'],
  providers: [HandledataService]
})
export class WalletRemoveComponent implements OnInit {
  WalletMoney: any;
  Wallet: any;
  myFormGroup: FormGroup;
  model: wallet;//mapped it to a variable
  submitted = false;

  response: any;

  private Date: Date;
  private Description: string;
  private Withdraw: number;


  constructor(private router: Router, private handleservice: HandledataService, private http: Http, private formBuilder: FormBuilder, private _location: Location) { }
  name: string;
  ngOnInit() {
    this.model = new wallet(this.Date, this.Description, this.Withdraw);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, Validators.required],
      Description: [this.model.Description, [Validators.required, Validators.pattern("^[a-zA-Z]*")]],
      Withdraw: [this.model.Withdraw, Validators.required]
    });

    this.fetchWallet();
  }

  backClicked() {
    this._location.back();
  }

  fetchWallet = function () {
    this.handleservice.getData('Wallet')
      .subscribe((res: Response) => {

        this.Wallet = res.json();
        this.WalletMoney = this.Wallet[0].Money;

      });
  }

  storeWalletExpenses({ value, valid }: { value: wallet, valid: boolean }) {

    this.handleservice.getData('Wallet')
      .subscribe((res: Response) => {
        this.Wallet = res.json();
        this.WalletMoney = this.Wallet[0].Money;
        if (this.WalletMoney > 0 && this.WalletMoney >= value.Withdraw) {
          value.Flag = 'W';
          this.submitted = true;
          this.handleservice.store(value, 'addWalletExpenses').subscribe(x => this.response = x);//old
          this.handleservice.store(value, 'Wallet', 'remove')
            .subscribe(x => {
              this.response = x;
              this._location.back();
            });//old
        }
        else {
          alert("Money too Low! Go Get A Job! And Feed me!");
        }
      });



  }
  back() {
    this.submitted = !this.submitted;
  }
}
