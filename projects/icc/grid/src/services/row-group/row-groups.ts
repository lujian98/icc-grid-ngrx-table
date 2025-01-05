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
    let total = 0;
    this.rowGroups
      .filter((group) => !group.expanded)
      .forEach((group) => {
        total += group.displayedCounts;
      });
    return total;
  }

  getRowGroups<T>(data: T[]): T[] {
    const rootGroup = new IccRowGroup();
    rootGroup.expanded = true;
    data = [...data].filter((record) => !(record instanceof IccRowGroup));
    //console.log( '222222 data=', data)
    this.setRowGroups(data, 0, this.rowGroupFields, rootGroup);
    //console.log( 'aaaaaaaaaa data=', data)
    //console.log( 'aaaaaaaaaa this.rowGroups=', this.rowGroups)
    return this.getSublevel(data, 0, this.rowGroupFields, rootGroup);
  }

  private setRowGroups<T>(data: T[], level: number, rowGroupFields: IccRowGroupField[], parent: IccRowGroup) {
    const groups = this.uniqueBy(
      data.map((row: any) => {
        const column = rowGroupFields[0];
        const find = this.rowGroups.find((item) => item.field === column.field);
        const group = new IccRowGroup();
        group.level = level + 1;
        group.parent = parent;
        group.field = column.field;
        group.title = column.title!;
        group.value = row[column.field];
        //group.expanded = find ? find.expanded : true; // TODO when data changes group keep expanded
        group.expanded = true;
        return group;
      }),
      JSON.stringify,
    );
    this.rowGroups = groups;
  }

  private getSublevel<T>(data: T[], level: number, rowGroupFields: IccRowGroupField[], parent: IccRowGroup): T[] {
    if (level >= rowGroupFields.length) {
      return data as [];
    }
    //console.log( 'wwwwwwwwwwwwwww data=', data)
    const currentColumn = rowGroupFields[level].field;
    let subGroups: T[] = [];
    this.rowGroups.forEach((group: IccRowGroup) => {
      if (group.level === level + 1) {
        // group.expanded &&
        const rowsInGroup = this.uniqueBy(
          data.filter((row: T) => !(row instanceof IccRowGroup) && group.value === (row as any)[currentColumn]),
          JSON.stringify,
        );
        //console.log( 'sssssssssssssssss data=', rowsInGroup)
        const subGroup = this.getSublevel(rowsInGroup, level + 1, rowGroupFields, group as IccRowGroup);
        group.displayedCounts = rowsInGroup.length;
        subGroups = subGroups.concat(group as T);
        subGroups = subGroups.concat(subGroup);
      }
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
