import { Component, Injectable } from '@angular/core';
import { SunColumnConfig } from '../../../fields/fieldConfig.model';
import { SunCellEditNumberComponent } from './number/cell-edit-number.component';
import { SunCellEditSelectComponent } from './select/cell-edit-select.component';
import { SunCellEditTextComponent } from './text/cell-edit-text.component';

export interface SunCellEditData<T> {
  dataKeyId: string;
  dataKeyValue: string;
  field: string;
  value: T;
}

@Injectable({
  providedIn: 'root',
})
export class SunCellEditService {
  componentMapper: { [index: string]: any } = {
    number: SunCellEditNumberComponent,
    select: SunCellEditSelectComponent,
    text: SunCellEditTextComponent,
  };

  getColumnFilters() {
    return this.componentMapper;
  }

  getEditFieldByIndex(index: number, columnConfigs: SunColumnConfig[]): Component | null {
    const columnConfig = columnConfigs[index];
    const editField = columnConfig.editField;
    if (editField) {
      let type = 'text';
      if (typeof editField === 'string') {
        type = this.getEditFieldType(editField, columnConfigs);
      } else {
        const fieldType = columnConfig.fieldType;
        type = typeof fieldType === 'string' ? fieldType : fieldType.type;
      }
      return this.componentMapper[type];
    } else {
      return null;
    }
  }

  private getEditFieldType(editField: string, columnConfigs: SunColumnConfig[]): string {
    let type = 'text';
    columnConfigs.forEach((columnConfig) => {
      if (columnConfig.field === editField) {
        const fieldType = columnConfig.fieldType;
        type = typeof fieldType === 'string' ? fieldType : fieldType.type;
      }
    });
    return type;
  }
}
