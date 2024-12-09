import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccButtonConfg } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'icc-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, IccButtonComponent, IccIconModule],
})
export class IccLayoutHeaderComponent {
  @Input() title: string | undefined;
  @Input() buttons: IccButtonConfg[] = [];

  @Output() iccButtonClick = new EventEmitter<IccButtonConfg>(false);

  buttonClick(button: IccButtonConfg): void {
    this.iccButtonClick.emit(button);
  }
}
