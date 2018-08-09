import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
import { Http, Headers, ResponseContentType } from "@angular/http";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consts } from '../../utils/common/constants/const'
import { map } from 'rxjs/operators';

@Injectable()
export class HandledataService {
  data: any;
  hostno: string = Consts.URL//change this ip
  portno: string = Consts.PORT_NUMBER;
  urlno: string = 'http://' + this.hostno + ':' + this.portno;
  headers = new Headers({ 'Content-Type': 'application/json' });
  headerPost: HttpHeaders;

  constructor(private http: Http, private httpClient: HttpClient) { }

  createHeader() {
    this.headerPost = new HttpHeaders();
    this.headerPost.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getCount(api, id2?): Observable<any> {
    const url = `${this.urlno + '/' + api}/${id2}`;
    return this.http.get(
      url
    ).pipe(map((response) => response));

  }

  getData(api, id2 = 0): Observable<any> {
    if (id2 == 0) {
      const url = `${this.urlno + '/' + api}`;
      return this.http.get(
        url
      ).pipe(map((response) => response));
    } else {
      const url = `${this.urlno + '/' + api}/${id2}`;
      console.log(api);
      return this.http.get(
        url
      ).pipe(map((response) => response));
    }
  }

  delete(id, api, nop = 0): Observable<any> {
    if (nop == 0) {
      const url = `${this.urlno + '/' + api}/${id}`;
      return this.http.delete(
        url
      ).pipe(map((response) => response));
    } else {
      const url = `${this.urlno + '/' + api}/${id}/${nop}`;
      return this.http.delete(
        url
      ).pipe(map((response) => response));
    }
  }

  store(formBody, api, id = " ") {
    this.createHeader();
    return this.httpClient.post(
      `${this.urlno + '/' + api}/${id}`,
      formBody,
      { headers: this.headerPost }
    ).pipe(map((response) => response));
  }

  storefinolex(formbody, tab) {
    this.createHeader();
    const url = `${this.urlno + '/addgstdata'}/${tab}`;
    return this.httpClient.post(
      url,
      formbody,
      { headers: this.headerPost }
    ).pipe(map((response) => response));
  }

  storebooking(formbody, tab, nop) {
    this.createHeader();
    const url = `${this.urlno + '/addbookingdata'}/${tab}/${nop}`;//add seperate data for tab:-finolex data, nop:- booking data
    return this.httpClient.post(
      url,
      formbody,
      { headers: this.headerPost }
    ).pipe(map((response) => response));

  }

  storeparty(formbody, tab, nop) {

    this.createHeader();
    const url = `${this.urlno + '/addpartydata'}/${tab}/${nop}`;//add seperate data for tab:-finolex data, nop:- booking data
    return this.httpClient.post(
      url,
      formbody,
      { headers: this.headerPost }
    ).pipe(map((response) => response));

  }

  updateFinolexDetails(formBody, data) {
    console.log(formBody);
    const url = `${this.urlno + '/updatefinolexdetailsdata'}/${data}`;
    this.createHeader();
    return this.httpClient.put(
      url,
      formBody,
      { headers: this.headerPost }
    ).pipe(map((response) => response));
  }



  update(formBody, api) {
    const url = `${this.urlno + '/' + api}`;
    this.createHeader();
    return this.httpClient.put(
      url,
      formBody,
      { headers: this.headerPost }
    ).pipe(map((response) => response));
  }

}
