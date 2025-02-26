import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy } from '@angular/core';
import { IccButtonConfg, IccBUTTONS, IccButtonType, uniqueId } from '@icc/ui/core';
import { IccColumnConfig, IccGridFacade, IccGridStateModule, IccGridSetting } from '@icc/ui/grid';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { Observable } from 'rxjs';
import { IccTreeStateModule } from './+state/tree-state.module';
import { IccTreeFacade } from './+state/tree.facade';
import { IccTreeViewComponent } from './components/tree-view.component';
import {
  defaultTreeConfig,
  IccTreeConfig,
  IccTreeNode,
  IccTreeSetting,
  defaultTreeSetting,
} from './models/tree-grid.model';

@Component({
  selector: 'icc-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
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
  gridSetting$!: Observable<IccTreeSetting>; // Only support gridSetting for now
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
    this._treeConfig = { ...value };
    this.treeConfig$ = this.gridFacade.selectGridConfig(this.treeId);
    this.gridSetting$ = this.gridFacade.selectSetting(this.treeId);

    this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.treeId);
    this.gridFacade.initGridConfig(this.treeId, this.treeConfig, 'treeGrid');
    this.treeFacade.initTreeConfig(this.treeId, this.treeConfig);
  }

  @Input()
  set columnsConfig(val: IccColumnConfig[]) {
    this._columnsConfig = val;
    if (!this.treeConfig) {
      this.initGridConfig({ ...defaultTreeConfig });
    }
    if (!this.treeConfig.remoteColumnsConfig && this.columnsConfig.length > 0) {
      const treeSetting = { ...defaultTreeSetting, gridId: this.treeId };
      this.gridFacade.setGridColumnsConfig(this.treeConfig, treeSetting, this.columnsConfig);
    }
  }
  get columnsConfig(): IccColumnConfig[] {
    return this._columnsConfig;
  }

  @Input()
  set treeData(val: IccTreeNode<T>[]) {
    this._treeData = [...val];
    if (!this.treeConfig.remoteGridData && this.treeData) {
      this.treeFacade.setTreeInMemoryData(this.treeId, this.treeConfig, this._treeData);
    }
  }
  get treeData(): IccTreeNode<T>[] {
    return this._treeData;
  }

  buttonClick(button: IccButtonConfg, treeConfig: IccTreeConfig, gridSetting: IccGridSetting): void {
    switch (button.name) {
      case IccButtonType.Refresh:
        this.treeFacade.getTreeData(this.treeId, treeConfig);
        break;
      case IccButtonType.ClearAllFilters:
        console.log(' 2222 treeSetting=', gridSetting);
        this.gridFacade.setGridColumnFilters(this.treeConfig, gridSetting, []);
        break;

      case IccButtonType.ExpandAll:
        this.treeFacade.expandAllNodes(this.treeId, treeConfig, true);
        break;
      case IccButtonType.CollapseAll:
        this.treeFacade.expandAllNodes(this.treeId, treeConfig, false);
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
