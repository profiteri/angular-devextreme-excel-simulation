import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './csv.component';
import { TableService } from './csv.service';

import {
  DxSelectBoxModule,
  DxButtonModule,
  DxDataGridModule,
} from 'devextreme-angular';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxDataGridModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, TableComponent],
  providers: [TableService],
  bootstrap: [AppComponent],
})
export class AppModule {}
