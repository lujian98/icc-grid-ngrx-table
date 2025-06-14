import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output } from '@angular/core';

@Component({
  selector: 'icc-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'option',
    '[class.selected]': 'selected',
  },
})
export class IccOptionComponent<T> {
  readonly elementRef = inject(ElementRef);
  selected: boolean = false;

  value = input<T>();
  change = output<IccOptionComponent<T>>();

  get content() {
    return this.elementRef.nativeElement.textContent;
  }

  select(): void {
    this.setSelection(true);
  }

  deselect(): void {
    this.setSelection(false);
  }

  private setSelection(selected: boolean): void {
    if (this.selected !== selected) {
      this.selected = selected;
      this.change.emit(this);
    }
  }
}
