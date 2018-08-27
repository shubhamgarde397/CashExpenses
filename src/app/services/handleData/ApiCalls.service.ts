import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getFullApi } from './getFullApi.service';
import { handleFunction } from '../Functions/handleFunctions';

@Injectable()
export class ApiCallsService {
  private headerPost: HttpHeaders;
  private URL;

  constructor(private http: Http, private httpClient: HttpClient, private getfullapi: getFullApi, private handlefunction: handleFunction) { }

  handleData(api, apiCall, noOfIDs: number, formBody?, id1?, id2?, id3?) {
    this.handlefunction.createHeader();
    if (noOfIDs == 0) { this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs) }
    if (noOfIDs == 1) { this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1) }
    if (noOfIDs == 2) { this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1, id2) }
    if (noOfIDs == 3) { this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1, id2, id3) }
    if (apiCall == 0) { return this.http.get(this.URL).pipe(map((res) => res)); }
    if (apiCall == 1) { return this.httpClient.post(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res)); }
    if (apiCall == 2) { return this.http.delete(this.URL).pipe(map((res) => res)); }
    if (apiCall == 3) { return this.httpClient.put(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res)); }
  }
}
