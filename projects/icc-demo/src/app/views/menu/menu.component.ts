import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccLayoutPanelContentComponent } from '@icc/ui/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, IccLayoutPanelContentComponent, IccAccordionComponent],
})
export class AppMenuComponent {
  items: IccAccordion[] = [
    {
      name: 'Menu Demo',
      items: [{ name: 'Simple Menu', link: 'simple-menu' }],
    },
  ];
}
