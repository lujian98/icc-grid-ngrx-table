import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccLayoutPanelContentComponent } from '@icc/ui/layout-panel';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, IccLayoutPanelContentComponent, IccAccordionComponent],
})
export class AppSelectComponent {
  items: IccAccordion[] = [
    {
      name: 'Select Demo',
      items: [{ name: 'Simple Select', link: 'simple-select' }],
    },
  ];
}
