import { IccRowGroup } from './row-group';
import { IccRowGroupField } from '../../models/grid-column.model';

export class IccRowGroups {
  private _rowGroupFields: IccRowGroupField[] = []; // only support one level more than two use tree grid
  private _rowGroups: IccRowGroup[] = [];

  set rowGroups(groups: IccRowGroup[]) {
    this._rowGroups = groups;
  }
  get rowGroups(): IccRowGroup[] {
    return this._rowGroups;
  }

  set rowGroupFields(val: IccRowGroupField[]) {
    this._rowGroupFields = val;
  }
  get rowGroupFields(): IccRowGroupField[] {
    return this._rowGroupFields;
  }

  get totalHiddenCounts(): number {
    return this.rowGroups.filter((group) => !group.expanded).reduce((sum, group) => sum + group.totalCounts, 0);
  }

  getRowGroups<T>(data: T[]): T[] {
    data = [...data].filter((record) => !(record instanceof IccRowGroup));
    this.setRowGroups(data, this.rowGroupFields);
    return this.getSublevel(data, 0, this.rowGroupFields);
  }

  private setRowGroups<T>(data: T[], rowGroupFields: IccRowGroupField[]) {
    const groups = this.uniqueBy(
      data.map((row: any) => {
        const column = rowGroupFields[0];
        const value = row[column.field];
        const find = this.rowGroups.find((item) => item.field === column.field && item.value === value);
        const group = new IccRowGroup();
        group.field = column.field;
        group.value = value;
        group.expanded = find ? find.expanded : true;
        return group;
      }),
      JSON.stringify,
    );
    this.rowGroups = groups;
  }

  private getSublevel<T>(data: T[], level: number, rowGroupFields: IccRowGroupField[]): T[] {
    if (level >= rowGroupFields.length) {
      return data as [];
    }
    const currentColumn = rowGroupFields[level].field;
    let subGroups: T[] = [];
    this.rowGroups.forEach((group: IccRowGroup) => {
      const rowsInGroup = this.uniqueBy(
        data.filter((row: T) => !(row instanceof IccRowGroup) && group.value === (row as any)[currentColumn]),
        JSON.stringify,
      );
      group.totalCounts = rowsInGroup.length;
      const rowsInGroupVisible = group.expanded ? rowsInGroup : [];
      const subGroup = this.getSublevel(rowsInGroupVisible, level + 1, rowGroupFields);
      group.displayedCounts = rowsInGroupVisible.length;
      subGroups = subGroups.concat(group as T);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  uniqueBy<T>(a: T[], key: any) {
    const seen: { [index: string]: any } = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }
}
