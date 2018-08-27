import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallsService } from '../../services/handleData/ApiCalls.service';
import { wallet } from './wallet';
import { Consts } from "../../utils/common/constants/const";
import { Location } from '@angular/common';

@Component({
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrls: ['./wallet-add.component.css'],
  providers: [ApiCallsService]
})
export class WalletAddComponent implements OnInit {
  private Flag: any;
  private myFormGroup: FormGroup;
  private model: wallet;//mapped it to a variable
  private submitted = false;
  private response: any;
  private Date: Date;
  private Description: string;
  private Deposit: number;
  public name: string;

  constructor(
    private handleservice: ApiCallsService,
    private http: Http,
    private formBuilder: FormBuilder,
    private _location: Location
  ) { }

  ngOnInit() {
    this.model = new wallet(this.Date, this.Description, this.Deposit, this.Flag);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, Validators.required],
      Description: [this.model.Description, [Validators.required, Validators.pattern("^[a-zA-Z]*")]],
      Deposit: [this.model.Deposit, Validators.required]
    });

  }

  backClicked() {
    this._location.back();
  }

  storeWalletExpenses({ value, valid }: { value: wallet, valid: boolean }) {
    this.submitted = true;
    value.Flag = 'D';
    this.handleservice.handleData('addWalletExpenses', 1, 0, {}).subscribe(x => this.response = x);//old
    this.handleservice.handleData('Wallet', 1, 1, value, 'add')
      .subscribe(x => {
        this.response = x
        this._location.back();
      });//old
  }
  back() {
    this.submitted = !this.submitted;
  }
}
