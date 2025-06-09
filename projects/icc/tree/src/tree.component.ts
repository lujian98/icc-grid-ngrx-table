import { ChangeDetectionStrategy, Component, inject, input, OnDestroy } from '@angular/core';
import { IccButtonConfg, IccBUTTONS, IccButtonType } from '@icc/ui/core';
import { IccColumnConfig, IccGridFacade, IccGridStateModule } from '@icc/ui/grid';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccSpinnerDirective } from '@icc/ui/spinner';
import { IccTreeStateModule } from './+state/tree-state.module';
import { IccTreeFacade } from './+state/tree.facade';
import { IccTreeViewComponent } from './components/tree-view.component';
import { defaultTreeConfig, defaultTreeSetting, IccTreeConfig, IccTreeNode } from './models/tree-grid.model';

@Component({
  selector: 'icc-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IccIconModule,
    IccTreeStateModule,
    IccGridStateModule,
    IccTreeViewComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccSpinnerDirective,
  ],
})
export class IccTreeComponent<T> implements OnDestroy {
  private readonly treeFacade = inject(IccTreeFacade);
  private readonly gridFacade = inject(IccGridFacade);
  private treeId = `tree-${crypto.randomUUID()}`;
  treeConfig$ = this.gridFacade.getGridConfig(this.treeId);
  gridSetting$ = this.gridFacade.getSetting(this.treeId); // Only support gridSetting for now
  columnsConfig$ = this.gridFacade.getColumnsConfig(this.treeId);
  treeData$ = this.treeFacade.getTreeSignalData(this.treeId);

  buttons: IccButtonConfg[] = [
    IccBUTTONS.Refresh,
    IccBUTTONS.ClearAllFilters,
    IccBUTTONS.ExpandAll,
    IccBUTTONS.CollapseAll,
  ];

  treeConfig = input(defaultTreeConfig, {
    transform: (value: Partial<IccTreeConfig>) => {
      const treeConfig = { ...defaultTreeConfig, ...value };
      this.initGridConfig(treeConfig);
      return treeConfig;
    },
  });
  columnsConfig = input([], {
    transform: (columnsConfig: IccColumnConfig[]) => {
      if (!this.treeConfig) {
        this.initGridConfig({ ...defaultTreeConfig });
      }
      if (!this.treeConfig$().remoteColumnsConfig && columnsConfig.length > 0) {
        const treeSetting = { ...defaultTreeSetting, gridId: this.treeId };
        this.gridFacade.setGridColumnsConfig(this.treeConfig$(), treeSetting, columnsConfig);
      }
      return columnsConfig;
    },
  });
  treeData = input(undefined, {
    transform: (treeData: IccTreeNode<T>[]) => {
      if (!this.treeConfig$().remoteGridData && treeData) {
        this.treeFacade.setTreeInMemoryData(this.treeId, this.treeConfig$(), treeData);
      }
      return treeData;
    },
  });

  private initGridConfig(treeConfig: IccTreeConfig): void {
    this.gridFacade.initGridConfig(this.treeId, treeConfig, 'treeGrid');
    this.treeFacade.initTreeConfig(this.treeId, treeConfig);
  }

  buttonClick(button: IccButtonConfg): void {
    switch (button.name) {
      case IccButtonType.Refresh:
        this.treeFacade.getTreeData(this.treeId, this.treeConfig$());
        break;
      case IccButtonType.ClearAllFilters:
        this.gridFacade.setGridColumnFilters(this.treeConfig$(), this.gridSetting$(), []);
        break;

      case IccButtonType.ExpandAll:
        this.treeFacade.expandAllNodes(this.treeId, this.treeConfig$(), true);
        break;
      case IccButtonType.CollapseAll:
        this.treeFacade.expandAllNodes(this.treeId, this.treeConfig$(), false);
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
