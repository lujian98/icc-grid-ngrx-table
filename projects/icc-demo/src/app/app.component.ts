import { ChangeDetectionStrategy, Component, Inject, inject, Renderer2 } from '@angular/core';
import { IccColumnConfig, IccGridConfig, defaultGridConfig } from '@icc/ui/grid';
import { IccThemeService, ICC_DOCUMENT } from '@icc/ui/theme';
import { CARSDATA3 } from '@icc/ui/grid/src/spec-helpers/cars-large';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private themeService = inject(IccThemeService);

  title = 'icc-demo';
  label = 'Test Button';

  // items = ['Item 1A', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

  items = [{
    label: "item 1A",
    items: [{
      label: 'Menu 1',
    }, {
      label: 'Menu 2',
    }, {
      label: 'Menu 3',
    }]
  }, {
    label: "item 1A",
    items: [{
      label: 'Menu 1',
    }, {
      label: 'Menu 2',
    }, {
      label: 'Menu 3',
    }]
  }]

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

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
  }

  constructor(
    protected renderer: Renderer2,
    @Inject(ICC_DOCUMENT) protected document: Document,
  ) {}

  ngOnInit() { // TODO below should be in the @icc/ui/theme?
    this.themeService
      .onThemeChange()
     // .pipe(takeWhile(() => this.alive))
      .subscribe((theme: any) => {
        const body = this.document.getElementsByTagName('body')[0];
        if (theme.previous) {
          this.renderer.removeClass(body, `icc-theme-${theme.previous}`);
        }
        this.renderer.addClass(body, `icc-theme-${theme.name}`);
      });
  }

}
