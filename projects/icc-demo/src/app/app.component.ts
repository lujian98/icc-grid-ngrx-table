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
    name: "Grid Remote Data",
    items: [
      { name: 'Simple Grid', link: 'grid/remote-simple-grid', },
      { name: 'Grid Sort', link: 'grid/remote-grid-sort', },
      { name: 'Grid Filter', link: 'grid/remote-grid-filter', },
      { name: 'Grid Column Resize', link: 'grid/remote-grid-column-resize', },
      { name: 'Grid Column Reorder', link: 'grid/remote-grid-column-reorder', },
      { name: 'Grid Column Menu', link: 'grid/remote-grid-column-menu', },

      {
      name: 'Grid Test',
      link: 'grid/grid-test',
      icon: 'arrows-rotate',
    }, {
      name: 'Grid Test 2',
      link: 'grid/grid-test2',
      icon: 'arrows-rotate',
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
    }, {
      name: 'Menu 4',
      //link: 'test',
      checkbox: true,
      checked: true,
      icon: 'arrows-rotate',
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

  onCheckboxChange(event: any): void {
    console.log( ' 999999 event=', event)
  }
}
