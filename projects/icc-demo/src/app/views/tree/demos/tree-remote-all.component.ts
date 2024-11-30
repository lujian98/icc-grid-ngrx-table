import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTreeComponent, defaultTreeConfig, IccTreeConfig } from '@icc/ui/tree';

@Component({
  selector: 'app-tree-remote-all',
  template: `<icc-tree [treeConfig]="treeConfig"></icc-tree>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccTreeComponent],
})
export class AppTreeRemoteAllComponent {
  treeConfig: IccTreeConfig = {
    ...defaultTreeConfig,
    urlKey: 'ECR',
    remoteGridConfig: true,
  };
}
