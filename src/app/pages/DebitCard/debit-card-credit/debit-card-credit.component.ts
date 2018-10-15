import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallsService } from '../../../services/handleData/ApiCalls.service';
import { debitCard } from '../debit-card-display/debitCard';
import { Consts } from "../../../utils/common/constants/const";
import { Location } from '@angular/common';

@Component({
  selector: 'app-debit-card-credit',
  templateUrl: './debit-card-credit.component.html',
  styleUrls: ['./debit-card-credit.component.css']
})
export class DebitCardCreditComponent implements OnInit {
  private Flag: any;
  private myFormGroup: FormGroup;
  private model: debitCard;//mapped it to a variable
  private submitted = false;
  private response: any;
  public date: Date;
  public location: string;
  public reason: string;
  public amount: number;
  public credit_expenses: string;
  public dataDebitCardCredit: boolean = false;


  constructor(
    private handleservice: ApiCallsService,
    private http: Http,
    private formBuilder: FormBuilder,
    private _location: Location
  ) { }

  ngOnInit() {
    this.model = new debitCard(this.date, this.location, this.reason, this.amount);
    this.myFormGroup = this.formBuilder.group({
      date: [this.model.date, Validators.required],
      location: [this.model.location, [Validators.required, Validators.pattern('^[A-Za-z]*')]],
      reason: [this.model.reason, [Validators.required, Validators.pattern('^[A-Za-z]*')]],
      amount: [this.model.amount]
    });
    this.find();

  }

  find() {
    this.handleservice.handleData('Card/getCardCreditDetails', 0, 0)
      .subscribe((res: Response) => {
        this.credit_expenses = res.json();
        if (this.credit_expenses) {
          this.dataDebitCardCredit = true;
        }
      });
  }

  backClicked() {
    this._location.back();
  }

  storeCardCreditDetails({ value, valid }: { value: debitCard, valid: boolean }) {
    this.submitted = true;
    this.handleservice.handleData('Card/addCardCreditDetails', 1, 0, value)
      .subscribe((x) => {
        this.find();
      });
  }
  back() {
    this.submitted = !this.submitted;
  }
}
