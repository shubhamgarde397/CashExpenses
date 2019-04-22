import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-python-programming',
  templateUrl: './python-programming.component.html',
  styleUrls: ['./python-programming.component.css']
})
export class PythonProgrammingComponent implements OnInit {
  public data = [];
  constructor() { }

  ngOnInit() {

    this.data = [

      {
        'product_key': 100205778829,
        'side': 'B',
        'agg_unit': 'HK - BNPASGH - HK - 692',
        'execution_key': 'HK - NCB190169925 - N - 20190116 - 151518'
      },
      {
        'product_key': 100205778829,
        'side': 'S',
        'agg_unit': 'HK - BNPASGH - HK - 692',
        'execution_key': 'HK - NCB190169926 - N - 20190116 - 151351'
      },
      {
        'product_key': 100208346271,
        'side': 'B',
        'agg_unit': 'HK - SUHKHKH - HK - 883',
        'execution_key': 'HK - CPB190169623 - N - 20190116 - 135146'
      },
      {
        'product_key': 100208346271,
        'side': 'S',
        'agg_unit': 'HK - SUHKHKH - HK - 883',
        'execution_key': 'HK - CPB190169842 - N - 20190116 - 103009'
      },
      {
        'product_key': 100208735950,
        'side': 'B',
        'agg_unit': 'HK - MIDLLOH - HK - 78',
        'execution_key': ' HK - CPB190179945 - N - 20190116 - 185256'
      },
      {
        'product_key': 100208735950,
        'side': 'S',
        'agg_unit': 'HK - MIDLLOH - HK - 78',
        'execution_key': ' HK - CPB190179944 - N - 20190116 - 185822'
      },
      {
        'product_key': 100214232721,
        'side': 'B',
        'agg_unit': 'HK - HSBCINT - HK - 15',
        'execution_key': ' HK - GSB190168650 - N - 20190116 - 154143'
      },
      {
        'product_key': 100214232721,
        'side': 'B',
        'agg_unit': 'HK - HSBCINT - HK - 198',
        'execution_key': 'HK - GSB190168648 - N - 20190116 - 154243'
      },
      {
        'product_key': 100214232721,
        'side': 'S',
        'agg_unit': 'HK - HSBCINT - HK - 15',
        'execution_key': ' HK - GSB190168649 - N - 20190116 - 154243'
      },
      {
        'product_key': 100214232721,
        'side': 'S',
        'agg_unit': 'HK - HSBCINT - HK - 198',
        'execution_key': 'HK - GSB190168651 - N - 20190116 - 154143'
      },
      {
        'product_key': 100215124850,
        'side': 'B',
        'agg_unit': 'HK - HSBCHKH - HK - 433',
        'execution_key': 'HK - NCB190179879 - N - 20190116 - 91225'
      },
      {
        'product_key': 100215124850,
        'side': 'B',
        'agg_unit': 'HK - HSBCHKH - HK - 433',
        'execution_key': 'HK - NCB190179878 - N - 20190116 - 91225'
      }

    ]

  }

}
