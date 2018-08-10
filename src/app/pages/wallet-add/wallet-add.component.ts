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
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrls: ['./wallet-add.component.css'],
  providers: [HandledataService]
})
export class WalletAddComponent implements OnInit {
  Flag: any;
  myFormGroup: FormGroup;
  model: wallet;//mapped it to a variable
  submitted = false;

  response: any;

  private Date: Date;
  private Description: string;
  private Deposit: number;


  constructor(private router: Router, private handleservice: HandledataService, private http: Http, private formBuilder: FormBuilder, private _location: Location) { }
  name: string;
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
    console.log(value)
    this.handleservice.store(value, 'addWalletExpenses').subscribe(x => this.response = x);//old
    this.handleservice.store(value, 'Wallet', 'add')
      .subscribe(x => {
        this.response = x
        this._location.back();
      });//old

  }
  back() {
    this.submitted = !this.submitted;
  }
}
