import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { sortByField, IccObjectType } from '@icc/ui/core';
import { IccGridConfig, IccGridComponent, IccColumnConfig, defaultGridConfig, IccGridData } from '@icc/ui/grid';
import {
  CARSDATA3,
  DCRBrands,
  DCRColors,
  DCRColorsList,
  DCRBrandsList,
  MakerColorList,
} from '../../../data/cars-large';

@Component({
  selector: 'app-grid-cell-edit-text',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig" [gridData]="gridData"></icc-grid>`,
  styles: [':host {  display: flex; width: 100%; padding: 0 0px }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccGridComponent],
})
export class AppGridCellEditTextComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    columnSort: true,
    columnFilter: true,
    columnResize: true,
    columnReorder: true,
    columnMenu: true,
    columnHidden: true,
    rowSelection: true,
    cellEdit: true,
    sortFields: [
      {
        field: 'brand',
        dir: 'asc',
      },
    ],
    //columnFilters: [{ name: 'vin', value: '9' }],
    remoteColumnsConfig: false,
    remoteGridData: false,
  };

  columnsConfig: IccColumnConfig[] = [
    {
      name: 'ID',
      width: 50,
      align: 'center',
    },
    {
      name: 'vin',
      cellEditable: true,
    },
    {
      name: 'brand',
      cellEditable: true,
      rendererType: IccObjectType.Select,
      rendererFieldConfig: {
        options: DCRBrandsList,
        singleListOption: true,
        remoteOptions: false,
        //editable: true,
      },
      filterFieldConfig: {
        fieldType: IccObjectType.Select,
        multiSelection: true,
        remoteOptions: false,
        options: DCRBrands,
        //optionKey: 'name',
        //optionLabel: 'title',
      },
    },
    {
      name: 'MakeDate',
      title: 'Manufacture Date',
      width: 100,
      cellEditable: true,
      rendererType: IccObjectType.Date,
      rendererFieldConfig: {
        dateFormat: 'longDate',
      },
      filterField: IccObjectType.DateRange,
      align: 'center',
    },
    {
      name: 'Price',
      width: 70,
      cellEditable: true,
      rendererType: IccObjectType.Number,
      rendererFieldConfig: {
        decimals: 2,
      },
      filterField: IccObjectType.Number,
      align: 'right',
    },
    {
      name: 'MakerColor',
      cellEditable: true,
      rendererType: IccObjectType.Select,
      rendererFieldConfig: {
        optionKey: 'name',
        optionLabel: 'title',
        options: MakerColorList,
        remoteOptions: false,
      },
      filterFieldConfig: {
        fieldType: 'select',
        multiSelection: true,
        remoteOptions: false,
        options: MakerColorList,
        optionKey: 'name',
        optionLabel: 'title',
      },
      width: 100,
    },
    {
      name: 'year',
      rendererType: IccObjectType.Number,
      cellEditable: true,
      width: 50,
      align: 'right',
    },
    {
      name: 'color',
      width: 80,
      rendererType: IccObjectType.Select,
      cellEditable: true,
      rendererFieldConfig: {
        fieldType: IccObjectType.Select,
        options: DCRColorsList,
        singleListOption: true,
        remoteOptions: false,
        //editable: true,
      },
      filterFieldConfig: {
        fieldType: IccObjectType.Select,
        //multiSelection: true,
        singleListOption: true,
        options: DCRColorsList,
        remoteOptions: false,
      },
      align: 'center',
    },
  ];
  gridData: IccGridData<any> = CARSDATA3;
}
