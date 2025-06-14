import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChild, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { IccOptionComponent } from '@icc/ui/option';
import { IccOverlayModule } from '@icc/ui/overlay';
import { IccAutocompleteContentDirective } from './autocomplete-content.directive';

@Component({
  selector: 'icc-autocomplete',
  templateUrl: './autocomplete.component.html',
  exportAs: 'iccAutocomplete',
  styleUrls: ['./autocomplete.component.scss'],
  imports: [CommonModule, IccOverlayModule],
})
export class IccAutocompleteComponent<T, G> {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private _selection = new SelectionModel<IccOptionComponent<T>>(false, []);
  private _value: T | null = null;
  displayWith = input<(value: T) => string>();
  compareWith = input<(value: T, option: T) => boolean>();
  multiSelection = input(false, {
    transform: (multiSelection: boolean) => {
      this.selection = new SelectionModel<IccOptionComponent<T>>(multiSelection, []);
      return multiSelection;
    },
  });

  get selection(): SelectionModel<IccOptionComponent<T>> {
    return this._selection;
  }
  set selection(selection: SelectionModel<IccOptionComponent<T>>) {
    this._selection = selection;
  }

  get value(): T | null {
    return this._value;
  }
  set value(val: T | null) {
    this._value = val;
  }

  get toDisplay(): string {
    if (this.displayWith()) {
      return this.displayWith()!(this.value!);
    } else if (
      this.multiSelection() &&
      Array.isArray(this.value) &&
      this.value.every((i) => typeof i === 'string' || typeof i === 'number')
    ) {
      return this.value.sort((a, b) => a.localeCompare(b)).join(', ');
    } else if (this.selection.selected && this.selection.selected.length > 0) {
      return this.selection.selected
        .map((selected) => selected.content)
        .sort((a, b) => a.localeCompare(b))
        .join(', ');
    } else {
      return this.value ? (this.value as string) : '';
    }
  }

  @ViewChild('root', { static: true }) rootTemplate!: TemplateRef<G>;
  @ContentChild(IccAutocompleteContentDirective, { static: true }) content!: IccAutocompleteContentDirective<G>;

  setSelectionOption(option: IccOptionComponent<T>): void {
    if (this.multiSelection() && Array.isArray(this.value)) {
      const find = this.value.findIndex((item: T) => this.compareValue(option.value()!, item));
      if (find > -1) {
        option.deselect();
        const selected = this.selection.selected.find((item) => this.compareValue(option.value()!, item.value()!));
        if (selected) {
          this.selection.deselect(selected);
        }
        this.value.splice(find, 1);
      } else {
        option.select();
        this.selection.select(option);
        this.value.push(option.value());
      }
    } else {
      this.selection.clear();
      option.select();
      this.selection.select(option);
      this.value = option.value()!;
    }
    this.changeDetectorRef.markForCheck();
  }

  private compareValue(value: T, item: T): boolean {
    return this.compareWith() ? this.compareWith()!(value, item) : value === item;
  }
}
