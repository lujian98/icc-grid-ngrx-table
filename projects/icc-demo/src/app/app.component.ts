import { Component, inject } from '@angular/core';
import { IccColumnConfig, IccGridConfig, defaultGridConfig } from '@icc/ui/grid';
import { IccDialogService, IccDialogRef } from '@icc/ui/dialog';

import { CARSDATA } from './data/cars-large';
//import { CARSHUGEDATA } from './cars-huge';



@Component({
  selector: 'test-dialog',
  template: `
  <div>Dialog window </div>
  `,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponentDialog {
  private dialogRef = inject(IccDialogRef<TestComponentDialog>);
  data: any;

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private dialogService = inject(IccDialogService);
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

  showDialog: boolean = true;
  openDialog(): void {
    this.dialogService.open(TestComponentDialog, {
      context: { data: {test: 1} },
      hasBackdrop: false,
      closeOnBackdropClick: false,
    });
  }
  enableDialog(): void {
    this.showDialog = !this.showDialog;
  }
}
