import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IccAccordion } from './models/accordion.model';

@Component({
  selector: 'icc-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccAccordionComponent {
  @Input() items: IccAccordion[] = [];

  isExpaneded(index: number): boolean {
    return index === 1;
  }

  getTitle(item: IccAccordion): string {
    return item.title === undefined ? item.name : item.title;
  }
}
