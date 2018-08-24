import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandledataService } from '../../services/handleData/handledata.service';
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

  response: any;

  hostno: string = Consts.URL//change this ip
  portno: string = Consts.PORT_NUMBER;
  urlno: string = 'http://' + this.hostno + ':' + this.portno;
  constructor(private router: Router, private handleservice: HandledataService, private http: Http, private formBuilder: FormBuilder, private _location: Location) { }
  name: string;
  ngOnInit() {
    this.model = new category(this.name);
    this.myFormGroup = this.formBuilder.group({
      category: [this.model.category, Validators.required]
    });
  }

  storeCategoryData({ value, valid }: { value: category, valid: boolean }) {
    console.log(JSON.stringify(value));
    this.submitted = true;
    this.handleservice.store(value, 'addcategorydata').subscribe(x => this.response = x);//old
  }
  back() {
    this.submitted = !this.submitted;
  }

  backClicked() {
    this._location.back();
  }
}
