import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccColumnConfig, IccGridConfig, defaultGridConfig } from '@icc/ui/grid';
import { CARSDATA3 } from '@icc/ui/grid/src/spec-helpers/cars-large';
import { IccThemeService } from '@icc/ui/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private themeService = inject(IccThemeService);
  title = 'icc-demo';

  items = [{
    title: "Grid Examples",
    items: [{
      title: 'Grid Test',
      link: 'grid/grid-test',
    }, {
      title: 'Grid Test 2',
      link: 'grid/grid-test2',
    }, {
      title: 'Menu 3',
      link: 'test',
    }]
  }, {
    title: "item 1A",
    items: [{
      title: 'Menu 1',
      link: 'test',
    }, {
      title: 'Menu 2',
      link: 'test',
    }, {
      title: 'Menu 3',
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
