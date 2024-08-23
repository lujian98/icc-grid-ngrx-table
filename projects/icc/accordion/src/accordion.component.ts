import { ChangeDetectionStrategy, Component, HostBinding, Input, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'icc-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccAccordionComponent {
  @Input() items: any[] = [];

  isExpaneded(index: number): boolean {
    return index === 0;
  }

}
