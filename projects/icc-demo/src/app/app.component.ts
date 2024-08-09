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

  columnConfig: IccColumnConfig[] = [{
    field: 'name',
  }, {
    field: 'position',
  }, {
    field: 'symbol',
  }, {
    field: 'weight',
  }];
}
