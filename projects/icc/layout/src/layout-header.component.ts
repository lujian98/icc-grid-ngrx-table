import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IccButtonConfg, IccButtonType, IccBUTTONS } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';

@Component({
  selector: 'icc-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, IccButtonComponent, IccIconModule],
})
export class IccLayoutHeaderComponent {
  @Input() title: string = '';
  @Input() buttons: IccButtonConfg[] = [];

  @Output() iccButtonClick = new EventEmitter<IccButtonConfg>(false);

  buttonClick(button: IccButtonConfg): void {
    console.log(' button=', button);
    this.iccButtonClick.emit(button);
  }
}
