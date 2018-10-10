import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../services/handleData/ApiCalls.service';
import { category } from './category';
import { Consts } from "../../utils/common/constants/const";
import { FormsModule } from "@angular/forms";
import { Location } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  myFormGroup: FormGroup;
  model: category;//mapped it to a variable
  modelSubmitted: category;
  submitted = false;
  private categorylist: any;

  response: any;

  hostno: string = Consts.URL//change this ip
  portno: string = Consts.PORT_NUMBER;
  urlno: string = 'http://' + this.hostno + ':' + this.portno;
  constructor(private router: Router, private handleservice: ApiCallsService, private http: Http, private formBuilder: FormBuilder, private _location: Location) { }
  name: string;
  ngOnInit() {
    this.model = new category(this.name);
    this.myFormGroup = this.formBuilder.group({
      category: [this.model.category, Validators.required]
    });

    this.fetchData();
  }
  fetchData() {
    this.handleservice.handleData('Wallet/getcategorydata', 0, 0)
      .subscribe((res: Response) => {
        this.categorylist = res.json();
      });
  }

  storeCategoryData({ value, valid }: { value: category, valid: boolean }) {
    this.submitted = true;
    this.handleservice.handleData('Wallet/addcategorydata', 1, 0, value).subscribe((response: Response) => { this.fetchData(); });//old
  }

  deleteCategory(id) {
    if (confirm('Are you sure?')) {
      this.handleservice.handleData('Wallet/delcategorydata', 2, 1, {}, id)
        .subscribe((response: Response) => {
          this.fetchData();
        });
    }
  }
  back() {
    this.submitted = !this.submitted;
  }

  backClicked() {
    this._location.back();
  }
}
