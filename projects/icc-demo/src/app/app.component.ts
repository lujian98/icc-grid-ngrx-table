import { Component } from '@angular/core';
import { IccColumnConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icc-demo';
  label = 'Test Button';
  gridName: string = 'DCR';

  columnConfig: IccColumnConfig[] = [{
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
}
