import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { IccDatePresetItem } from '../model/model';
// TODO not used
@Component({
  selector: 'icc-calendar-presets',
  templateUrl: './calendar-presets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateDirective],
})
export class IccCalendarPresetsComponent {
  @Input() presets!: Array<IccDatePresetItem>;
  @Output() readonly presetChanged: EventEmitter<any> = new EventEmitter<any>();

  setPresetPeriod(event: IccDatePresetItem): void {
    this.presetChanged.emit(event);
  }
}
