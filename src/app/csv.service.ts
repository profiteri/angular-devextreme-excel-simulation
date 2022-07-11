import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  dataMap = new Map();

  data: string[] = [
    'assets/test1.csv',
    'assets/test.csv',
    'assets/MICs.csv',
    'assets/xetr.csv',
  ];

  constructor(private http: HttpClient) {
    this.dataMap.set('test1', 'assets/test1.csv');
    this.dataMap.set('test', 'assets/test.csv');
    this.dataMap.set('MICs', 'assets/MICs.csv');
    //this.dataMap.set('xetr', 'assets/xetr.csv');
  }

  getInfo(key: string) {
    return this.http.get(this.dataMap.get(key), { responseType: 'text' });
  }
}
