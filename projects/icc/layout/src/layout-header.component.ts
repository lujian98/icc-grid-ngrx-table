import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IccButtonComponent } from '@icc/ui/button';
import { IccButtonConfg } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'icc-layout-header-end',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutHeaderEndComponent {}

@Component({
  selector: 'icc-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, IccButtonComponent, IccIconModule, IccLayoutHeaderEndComponent],
})
export class IccLayoutHeaderComponent {
  private router = inject(Router);
  @Input() title: string | undefined;
  @Input() buttons: IccButtonConfg[] = [];

  @Output() iccButtonClick = new EventEmitter<IccButtonConfg>(false);

  buttonClick(button: IccButtonConfg): void {
    if (button.link) {
      this.router.navigate([button.link]);
    }
    this.iccButtonClick.emit(button);
  }

  getTitle(item: IccButtonConfg): string {
    return item.title === undefined ? item.name : item.title;
  }
}
