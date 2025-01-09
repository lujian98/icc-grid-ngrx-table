import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { uniqueId, IccButtonConfg, IccBUTTONS, IccButtonType } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccColumnConfig, IccGridStateModule, IccGridFacade } from '@icc/ui/grid';
import { IccTreeViewComponent } from './components/tree-view.component';
import { IccTreeConfig, defaultTreeConfig, IccTreeNode } from './models/tree-grid.model';
import { IccTreeStateModule } from './+state/tree-state.module';
import { IccTreeFacade } from './+state/tree.facade';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';

@Component({
  selector: 'icc-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    IccIconModule,
    IccTreeStateModule,
    IccGridStateModule,
    IccTreeViewComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
  ],
})
export class IccTreeComponent<T> implements OnDestroy {
  private treeFacade = inject(IccTreeFacade);
  private gridFacade = inject(IccGridFacade);
  private _treeConfig!: IccTreeConfig;
  private _columnsConfig: IccColumnConfig[] = [];
  private _treeData!: IccTreeNode<T>[];
  private treeId = uniqueId(16);
  treeConfig$!: Observable<IccTreeConfig>;
  columnsConfig$!: Observable<IccColumnConfig[]>;

  buttons: IccButtonConfg[] = [
    IccBUTTONS.Refresh,
    IccBUTTONS.ClearAllFilters,
    IccBUTTONS.ExpandAll,
    IccBUTTONS.CollapseAll,
  ];

  @Input()
  set treeConfig(value: Partial<IccTreeConfig>) {
    this.initGridConfig({ ...defaultTreeConfig, ...value });
  }
  get treeConfig(): IccTreeConfig {
    return this._treeConfig;
  }

  private initGridConfig(value: IccTreeConfig): void {
    this._treeConfig = {
      ...value,
      gridId: this.treeId,
    };
    this.treeConfig$ = this.gridFacade.selectGridConfig(this.treeId);
    this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.treeId);
    this.gridFacade.initGridConfig(this.treeConfig);
    this.treeFacade.initTreeConfig(this.treeConfig);
  }

  @Input()
  set columnsConfig(val: IccColumnConfig[]) {
    this._columnsConfig = val;
    if (!this.treeConfig) {
      this.initGridConfig({ ...defaultTreeConfig });
    }
    if (!this.treeConfig.remoteColumnsConfig && this.columnsConfig.length > 0) {
      this.gridFacade.setGridColumnsConfig(this.treeConfig, this.columnsConfig);
    }
  }
  get columnsConfig(): IccColumnConfig[] {
    return this._columnsConfig;
  }

  @Input()
  set treeData(val: IccTreeNode<T>[]) {
    this._treeData = [...val];
    if (!this.treeConfig.remoteGridData && this.treeData) {
      this.treeFacade.setTreeInMemoryData(this.treeConfig, this._treeData);
    }
  }
  get treeData(): IccTreeNode<T>[] {
    return this._treeData;
  }

  buttonClick(button: IccButtonConfg, treeConfig: IccTreeConfig): void {
    switch (button.name) {
      case IccButtonType.Refresh:
        this.treeFacade.getTreeData(treeConfig);
        break;
      case IccButtonType.ClearAllFilters:
        this.gridFacade.setGridColumnFilters(this.treeConfig, []);
        break;

      case IccButtonType.ExpandAll:
        this.treeFacade.expandAllNodes(treeConfig, true);
        break;
      case IccButtonType.CollapseAll:
        this.treeFacade.expandAllNodes(treeConfig, false);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.gridFacade.clearGridDataStore(this.treeId);
    this.treeFacade.clearTreeDataStore(this.treeId);
  }
}
