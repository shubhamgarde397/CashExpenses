import { Injectable } from '@angular/core';
import { Consts } from '../../utils/common/constants/const';

@Injectable()
export class getFullApi {
  private data: any;
  private hostno: string = Consts.URL;
  private portno: string = Consts.PORT_NUMBER;
  private urlno: string = 'http://' + this.hostno + ':' + this.portno;

  constructor() { }

  appendAPIwithIDS(api, noOfIDs: number, id1?, id2?, id3?) {
    if (noOfIDs == 0) {
      return `${this.urlno + '/' + api}`;
    }
    if (noOfIDs == 1) {
      return `${this.urlno + '/' + api}/${id1}`;
    }
    if (noOfIDs == 2) {
      return `${this.urlno + '/' + api}/${id1}/${id2}`;
    }
    if (noOfIDs == 3) {
      return `${this.urlno + '/' + api}/${id1}/${id2}/${id3}`;
    }
  }
}
