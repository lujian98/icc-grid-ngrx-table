import { Component } from '@angular/core';
import { IccColumnConfig, IccGridConfig, defaultGridConfig } from '@icc/ui/grid';

import { CARSDATA } from './data/cars-large';
//import { CARSHUGEDATA } from './cars-huge';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icc-demo';
  label = 'Test Button';
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR',
    sortFields: [{
      field: 'ID',
      dir: 'desc',
    }]
  }

  columnConfig2: IccColumnConfig[] = [{
    name: 'name',
    //title: 'This is list of the name This is list of the name This is list of the name This is list of the name hhhhhh',
  }, {
    name: 'position',
    //title: '',
  }, {
    name: 'symbol',
  }, {
    name: 'weight',
  }];

  columnConfig: IccColumnConfig[] = [{
    name: 'vin',
  }, {
    name: 'brand',
  }, {
    name: 'year',
  }, {
    name: 'color',
  }];

  gridData = CARSDATA;
}
