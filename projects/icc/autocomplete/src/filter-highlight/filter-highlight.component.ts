import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

@Component({
  selector: 'icc-filter-highlight',
  templateUrl: './filter-highlight.component.html',
  //styleUrls: ['./filter-highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccFilterHighlightComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _value: string = '';
  private _filterValue: string = '';
  values: string[] = [];

  @Input() options: any[] = [];
  @Input() singleListOption: boolean = false;

  @Input()
  set value(val: T) {
    this._value = val as string;
    this.setValues();
  }
  get value(): string {
    return this._value;
  }

  @Input()
  set filterValue(val: string) {
    this._filterValue = val;
    this.setValues();
  }
  get filterValue(): string {
    return this._filterValue;
  }

  private setValues(): void {
    if (this.filterValue && this.value) {
      const pattern = this.filterValue
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
        .split(' ')
        .filter((t) => t.length > 0)
        .join('|');
      const regex = new RegExp(pattern, 'gi');
      const marked = this.value.replace(regex, (match) => `<mark>${match}<mark>`);
      this.values = marked.split('<mark>');
    } else {
      this.values = [this.value];
    }
    this.changeDetectorRef.markForCheck();
  }

  isMarkedValue(value: string): boolean {
    /*
    if (this.singleListOption) {
      //TODO
      const find = this.options.find((item) => item === value);
      //return !find;
      if (find) {
        // return find;
      }

      //return true;
    }*/
    return !!value && !!this.filterValue && value.toLowerCase() === this.filterValue.toLowerCase();
  }
}
