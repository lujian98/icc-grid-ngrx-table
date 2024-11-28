import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccLayoutCenterComponent, IccLayoutSidebarComponent } from '@icc/ui/layout';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, IccLayoutCenterComponent, IccLayoutSidebarComponent, IccAccordionComponent],
})
export class AppTreeComponent {
  items: IccAccordion[] = [
    {
      name: 'Tree Grid Demo',
      items: [
        { name: '0: Default Tree Grid', link: 'app-default-tree' },
        { name: '1: CDK Tree Grid', link: 'app-cdk-tree-grid' },
      ],
    },
  ];
}
