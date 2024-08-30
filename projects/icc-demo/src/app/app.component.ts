import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccColumnConfig, IccGridConfig, defaultGridConfig } from '@icc/ui/grid';
import { CARSDATA3 } from '@icc/ui/grid/src/spec-helpers/cars-large';
import { IccThemeService } from '@icc/ui/theme';
import { IccAccordion } from '@icc/ui/accordion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private themeService = inject(IccThemeService);
  title = 'icc-demo';

  items: IccAccordion[] = [{
    name: "Grid Examples",
    items: [{
      name: 'Grid Test',
      link: 'grid/grid-test',
    }, {
      name: 'Grid Test 2',
      link: 'grid/grid-test2',
    }, {
      name: 'Menu 3',
      link: 'test',
    }]
  }, {
    name: "item 1A",
    items: [{
      name: 'Menu 1',
      link: 'test',
    }, {
      name: 'Menu 2',
      link: 'test',
    }, {
      name: 'Menu 3',
      link: 'test',
    }]
  }]


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

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
  }
}
