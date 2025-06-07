import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IccButtonComponent } from '@icc/ui/button';
import { IccButtonConfg } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'icc-layout-header-end',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutHeaderEndComponent {}

@Component({
  selector: 'icc-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, IccButtonComponent, IccIconModule],
})
export class IccLayoutHeaderComponent {
  private readonly router = inject(Router);
  title = input<string | undefined>(undefined);
  buttons = input<IccButtonConfg[]>([]);

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
