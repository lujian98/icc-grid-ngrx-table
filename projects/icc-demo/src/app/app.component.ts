import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccColumnConfig, IccGridConfig, defaultGridConfig } from '@icc/ui/grid';
import { CARSDATA3 } from '@icc/ui/grid/src/spec-helpers/cars-large';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'icc-demo';
  label = 'Test Button';
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR',
    remoteColumnsConfig: true,
    remoteGridData: true,
    pageSize: 200,
    sortFields: [{
      field: 'ID',
      dir: 'desc',
    }],
    columnFilters: [{ name: 'vin', value: '9' }],
    rowSelection: true,
  }

  columnsConfig: IccColumnConfig[] = [{
    name: 'ID',
    width: 50,
    align: 'center',
  }, {
    name: 'vin',
    width: 50,
  }, {
    name: 'brand',
  }, {
    name: 'year',
  }, {
    name: 'color',
  }];

  gridData = CARSDATA3;

}
