import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IccMenuComponent } from '@icc/ui/menu';
import { IccAccordion } from './models/accordion.model';

@Component({
  selector: 'icc-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CdkAccordionModule, IccMenuComponent],
})
export class IccAccordionComponent {
  @Input() items: IccAccordion[] = [];
  @Input() expendIndex: number = 0;

  isExpaneded(index: number): boolean {
    return index === 3;
  }

  getTitle(item: IccAccordion): string {
    return item.title === undefined ? item.name : item.title;
  }
}
