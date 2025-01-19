import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IccOptionComponent } from '@icc/ui/option';
import { IccOverlayModule } from '@icc/ui/overlay';
import { merge, Observable } from 'rxjs';
import { filter, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { IccAutocompleteContentDirective } from './autocomplete-content.directive';

@Component({
  selector: 'icc-autocomplete',
  templateUrl: './autocomplete.component.html',
  exportAs: 'iccAutocomplete',
  styleUrls: ['./autocomplete.component.scss'],
  imports: [CommonModule, IccOverlayModule],
})
export class IccAutocompleteComponent<T> implements AfterContentInit, OnDestroy {
  @Input() displayWith!: (value: T) => string;
  @Input() compareWith!: (value: T, option: T) => boolean;
  private _selection = new SelectionModel<IccOptionComponent>(this.multiSelection, []);
  private _multiSelection: boolean = false;
  private _value: T | null = null;
  private alive = true;

  @Input()
  get multiSelection(): boolean {
    return this._multiSelection;
  }
  set multiSelection(val: boolean) {
    this._multiSelection = coerceBooleanProperty(val);
    this.selection = new SelectionModel<IccOptionComponent>(this._multiSelection, []);
  }

  get selection(): SelectionModel<IccOptionComponent> {
    return this._selection;
  }
  set selection(selection: SelectionModel<IccOptionComponent>) {
    this._selection = selection;
  }

  get value(): T | null {
    return this._value;
  }
  set value(val: T | null) {
    this._value = val;
  }

  get toDisplay(): string {
    if (this.displayWith) {
      return this.displayWith(this.value!);
    } else if (
      this.multiSelection &&
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

  @ViewChild('root', { static: true }) rootTemplate!: TemplateRef<any>;
  @ViewChild('options', { read: ElementRef }) optionList!: ElementRef;
  @ContentChild(IccAutocompleteContentDirective, { static: true }) content!: IccAutocompleteContentDirective;
  @ContentChildren(IccOptionComponent) options!: QueryList<IccOptionComponent>;

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.options.changes
      .pipe(
        startWith(this.options),
        filter(() => !!this.value && !!this.options?.length),
        takeWhile(() => this.alive),
      )
      .subscribe(() => {
        Promise.resolve().then(() => {
          this.selectValue(this.value);
        });
      });
  }

  optionsClick(): Observable<IccOptionComponent> {
    return this.options.changes.pipe(
      switchMap((options: QueryList<IccOptionComponent>) => {
        const clicks$ = options.map((option) => option.click);
        return merge(...clicks$);
      }),
    );
  }

  setSelectionOption(option: IccOptionComponent): void {
    if (this.multiSelection && Array.isArray(this.value)) {
      const find = this.value.findIndex((item: T) => this.compareValue(option.value, item));
      if (find > -1) {
        option.deselect();
        const selected = this.selection.selected.find((item) => this.compareValue(option.value, item.value));
        if (selected) {
          this.selection.deselect(selected);
        }
        this.value.splice(find, 1);
      } else {
        option.select();
        this.selection.select(option);
        this.value.push(option.value);
      }
    } else {
      this.selection.clear();
      option.select();
      this.selection.select(option);
      this.value = option.value;
    }
    this.changeDetectorRef.markForCheck();
  }

  selectValue(value: T | null): void {
    if (Array.isArray(value)) {
      let offset = -1;
      value.forEach((selected) => {
        const find = this.options.find((item: IccOptionComponent) => this.compareValue(selected, item.value));
        if (find) {
          find.select();
          const isSelected = this.selection.selected.find((item) => this.compareValue(selected, item.value));
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
        const isSelected = value.find((item) => this.compareValue(selected.value, item));
        if (!isSelected) {
          selected.deselect();
          this.selection.deselect(selected);
        }
      });
      this.options.forEach((option) => {
        const isSelected = value.find((item) => this.compareValue(option.value, item));
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
      const option = this.options.find((item: IccOptionComponent) => this.compareValue(value!, item.value));
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
    return this.compareWith ? this.compareWith(value, item) : value === item;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
