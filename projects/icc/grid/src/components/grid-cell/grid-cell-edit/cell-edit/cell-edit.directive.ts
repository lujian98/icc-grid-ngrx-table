import {
  OnDestroy,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, share } from 'rxjs/operators';
import { SunBaseGridDataSource } from '../../datasource/grid-datasource';
import { SunField } from '../../../fields/field';
import { SunCellEditData } from './cell-edit.service';
import { SunUtils } from '../../../utils/utils';

@Directive({
  selector: '[sunCellEdit]',
  standalone: false,
})
export class SunCellEditDirective<T> implements OnChanges, OnDestroy {
  @Input() column!: SunField;
  @Input() dataKeyId!: string;
  @Input() field!: string;
  @Input() value!: T;
  @Input() rowIndex!: number;
  @Input() colIndex!: number;
  @Input() record!: T;
  @Input() dataSource!: SunBaseGridDataSource<T>;

  @Output() sunSaveCellEditValueEvent: EventEmitter<SunCellEditData<T>> = new EventEmitter<SunCellEditData<T>>();
  @Output() sunCellEditSpecialKeyEvent: EventEmitter<T> = new EventEmitter<T>();

  componentRef: any;
  private sub!: Subscription;
  private subCellEditSpecialKeyEvent!: Subscription;

  constructor(private container: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.column?.firstChange) {
      this.addCellEditComponent(changes);
    } else if (changes.rowIndex) {
      this.componentRef.instance.rowIndex = changes.rowIndex.currentValue;
    }
  }

  addCellEditComponent(changes: SimpleChanges) {
    const column = changes.column.currentValue;
    if (column.editField) {
      this.componentRef = this.container.createComponent(column.editField);
      this.componentRef.instance.column = column;
      this.componentRef.instance.dataKeyId = this.dataKeyId;
      this.componentRef.instance.field = this.field;
      if (column.type === 'select') {
        this.value = column.getCheckedValue(this.value);
      } else if (column.type === 'number') {
        const decimals = SunUtils.countDecimals(this.value);
        this.componentRef.instance.step = 1 / Math.pow(10, decimals);
      }
      this.componentRef.instance.record = this.record;
      this.componentRef.instance.dataSource = this.dataSource;
      this.componentRef.instance.value = this.value;
      this.componentRef.instance.rowIndex = this.rowIndex;
      this.componentRef.instance.colIndex = this.colIndex;
    }
    this.sub = this.componentRef.instance.saveCellEditValue$.subscribe((cellData: SunCellEditData<T>) =>
      this.sunSaveCellEditValueEvent.emit(cellData),
    );
    this.subCellEditSpecialKeyEvent = this.componentRef.instance.cellEditSpecialKeyEvent$
      .pipe(debounceTime(50), distinctUntilChanged(), share())
      .subscribe((v: T) => this.sunCellEditSpecialKeyEvent.emit(v));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.subCellEditSpecialKeyEvent) {
      this.subCellEditSpecialKeyEvent.unsubscribe();
    }
  }
}
