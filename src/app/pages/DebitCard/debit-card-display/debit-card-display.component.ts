import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallsService } from '../../../services/handleData/ApiCalls.service';
import { debitCard } from './debitCard';
import { Consts } from "../../../utils/common/constants/const";
import { Location } from '@angular/common';

@Component({
  selector: 'app-debit-card-display',
  templateUrl: './debit-card-display.component.html',
  styleUrls: ['./debit-card-display.component.css']
})
export class DebitCardDisplayComponent implements OnInit {
  private Flag: any;
  private myFormGroup: FormGroup;
  private model: debitCard;//mapped it to a variable
  private submitted = false;
  private response: any;
  public date: Date;
  public location: string;
  public reason: string;
  public amount: number;
  public debit_expenses: string;
  public dataDebitCard: boolean = false;


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

    this.handleservice.handleData('Debit/hi', 0, 0)
      .subscribe((res: Response) => {
        this.debit_expenses = res.json();
        if (this.debit_expenses) {
          this.dataDebitCard = true;
        }
      });
  }

  backClicked() {
    this._location.back();
  }

  storeCardDetails({ value, valid }: { value: debitCard, valid: boolean }) {
    this.submitted = true;
    this.handleservice.handleData('DebitCard/addDebitCardDetails', 1, 0, value).subscribe(x => this.response = x);
  }
  back() {
    this.submitted = !this.submitted;
  }
}
