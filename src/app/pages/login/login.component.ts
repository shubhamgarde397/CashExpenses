import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../services/handleData/ApiCalls.service';
import { login } from './login';
import { Consts } from '../../utils/common/constants/const';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiCallsService]
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  show = true;

  hostno: string = Consts.URL; // change this ip
  portno: string = Consts.PORT_NUMBER;
  urlno: string = 'http://' + this.hostno + ':' + this.portno;
  myFormGroup: FormGroup;
  model: login;
  modelSubmitted: login;
  response: any;
  logindetailslist;


  constructor(private router: Router, private handleservice: ApiCallsService, private http: Http, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.model = new login(this.username, this.password);
    this.myFormGroup = this.formBuilder.group({
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required]
    });
  }

  login({ value, valid }: { value: login, valid: boolean }) {
    // const url = `${this.urlno + '/getLoginDetailsbyid'}/${value.username}/${value.password}`;
    // this.http.get(
    //   url
    // ).subscribe(res => {
    //   this.logindetailslist = res;
    //   if (this.logindetailslist._body === 'true') {
    this.show = !this.show;
    this.router.navigate(['Navigation']);
    //   } else {
    //     alert('Wrong Credentials..!');
    //   }
    // }
    // );
  }

  register() {
    this.show = !this.show;
    this.router.navigate(['Register']);
  }
}
