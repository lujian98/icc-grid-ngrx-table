import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  inject,
  input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IccOptionComponent } from '@icc/ui/option';
import { IccOverlayModule } from '@icc/ui/overlay';
import { merge, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { IccAutocompleteContentDirective } from './autocomplete-content.directive';

@Component({
  selector: 'icc-autocomplete',
  templateUrl: './autocomplete.component.html',
  exportAs: 'iccAutocomplete',
  styleUrls: ['./autocomplete.component.scss'],
  imports: [CommonModule, IccOverlayModule],
})
export class IccAutocompleteComponent<T, G> implements AfterContentInit, OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private _selection = new SelectionModel<IccOptionComponent<T>>(false, []);
  private _value: T | null = null;
  private destroy$ = new Subject<void>();

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
  @ViewChild('options', { read: ElementRef }) optionList!: ElementRef;
  @ContentChild(IccAutocompleteContentDirective, { static: true }) content!: IccAutocompleteContentDirective<G>;
  @ContentChildren(IccOptionComponent) options!: QueryList<IccOptionComponent<T>>;

  ngAfterContentInit(): void {
    this.options.changes
      .pipe(
        startWith(this.options),
        filter(() => !!this.value && !!this.options?.length),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        Promise.resolve().then(() => {
          this.selectValue(this.value);
        });
      });
  }

  optionsClick(): Observable<IccOptionComponent<T>> {
    return this.options.changes.pipe(
      switchMap((options: QueryList<IccOptionComponent<T>>) => {
        const clicks$ = options.map((option) => option.click);
        return merge(...clicks$);
      }),
    );
  }

  setSelectionOption(option: IccOptionComponent<T>): void {
    console.log(' aaaaaaaaaaaa option=', option);
    console.log(' sssssssss this.value=', this.value);
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

  selectValue(value: T | null): void {
    console.log(' bbbbbbbbbbbbb value=', value);
    if (Array.isArray(value)) {
      let offset = -1;
      value.forEach((selected) => {
        const find = this.options.find((item: IccOptionComponent<T>) => this.compareValue(selected, item.value()!));
        if (find) {
          find.select();
          const isSelected = this.selection.selected.find((item) => this.compareValue(selected, item.value()!));
          if (!isSelected) {
            this.selection.select(find);
          }
          const offsetTop = find.elementRef.nativeElement.offsetTop;
          if (offset === -1 || offset > offsetTop) {
            offset = offsetTop;
          }
        }
      });
      this.selection.selected.forEach((selected) => {
        const isSelected = value.find((item) => this.compareValue(selected.value()!, item));
        if (!isSelected) {
          selected.deselect();
          this.selection.deselect(selected);
        }
      });
      this.options.forEach((option) => {
        const isSelected = value.find((item) => this.compareValue(option.value()!, item));
        if (!isSelected) {
          option.deselect();
          this.selection.deselect(option);
        }
      });
      if (this.optionList) {
        this.optionList.nativeElement.scrollTop = offset > 100 ? offset : 0;
      }
    } else {
      this.selection.clear();
      const option = this.options.find((item: IccOptionComponent<T>) => this.compareValue(value!, item.value()!));
      if (option) {
        option.select();
        this.selection.select(option);
        if (this.optionList) {
          const offsetTop = option.elementRef.nativeElement.offsetTop;
          this.optionList.nativeElement.scrollTop = offsetTop;
        }
      }
    }
    this.changeDetectorRef.markForCheck();
  }

  private compareValue(value: T, item: T): boolean {
    return this.compareWith() ? this.compareWith()!(value, item) : value === item;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
