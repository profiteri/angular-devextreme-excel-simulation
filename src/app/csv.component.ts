import { TableService } from './csv.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'table',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css'],
})
export class TableComponent implements OnInit {
  buttonName = 'Start';

  dataSources: DataSource[] = [];

  dataSource: DataSource;

  jsonAr: any[] = [];

  xetr: any[] = [];

  wb = {
    tables: {},
    sheets: function (name: string) {
      return this.tables[name];
    },
  };

  constructor(private http: HttpClient, private covid: TableService) {}

  ngOnInit() {
    for (let key of this.covid.dataMap.keys()) {
      this.getData(key);
      console.log(key);
    }
  }

  getData(key: string) {
    this.covid.getInfo(key).subscribe((data) => {
      let tempData: any[] = data.split('\n');
      const tempRes: any[] = [];

      let structure = tempData[0].split(';');

      for (let i = 1; i < tempData.length; i++) {
        let temp = {};
        let j = 0;
        tempData[i].split(';').forEach((e) => {
          temp[structure[j]] = e;
          j++;
        });
        this.jsonAr.push(temp);
        tempRes.push(temp);
      }

      /*
      const dSource = new DataSource({
        load: (loadOptions) => {
          return new Promise((resolve, reject) => {
            const data = this.jsonAr;
            resolve(data);
          });
        },
      });

      this.dataSources.push(dSource);
    */
      console.log('data got');

      tempRes['columns'] = function (num) {
        let ar = this;
        let res = [];
        for (let i = 0; i < ar.length; i++) {
          let j = 0;
          for (let e in ar[i]) {
            if (j == num) {
              res.push(ar[i][e]);
            }
            j++;
          }
        }
        console.log(res);
      };

      this.wb.tables[key] = tempRes;

      this.wb.tables[key]['columns'](1);

      console.log(this.wb);
    });
  }

  test() {
    //wb["sheets"]("xetr_allTradableInstruments")["columns"](columnFrom)["copy"](wb["sheets"]("Result")["columns"](columnTo));
    for (let i = 0; i < this.wb.tables['test'].length; i++) {
      this.wb.tables['test'][i].Name = 'HELLO';
    }
    //this.wb.tables.test[0].Count = 'a';
  }

  setDataSource() {}

  columns() {
    console.log(this);
  }
  /*
  start() {
    this.dataSource = new DataSource({
      load: (loadOptions) => {
        return new Promise((resolve, reject) => {
          const data = this.xetr;
          resolve(data);
        });
      },
    });
  }*/
}
