import { IccRowGroup } from './row-group';

export interface IccGroupByColumn {
  title?: string;
  field: string;
  dir: string;
}

export class IccRowGroups {
  private _groupByColumns: IccGroupByColumn[] = []; // only support one level more than two use tree grid
  private _rowGroups: IccRowGroup[] = [];

  set rowGroups(groups: IccRowGroup[]) {
    this._rowGroups = groups;
  }

  get rowGroups(): IccRowGroup[] {
    return this._rowGroups;
  }

  set groupByColumns(val: IccGroupByColumn[]) {
    this._groupByColumns = val;
  }

  get groupByColumns(): IccGroupByColumn[] {
    return this._groupByColumns;
  }

  getRowGroups<T>(data: T[]): T[] {
    const rootGroup = new IccRowGroup();
    rootGroup.expanded = true;
    data = [...data].filter((record) => !(record instanceof IccRowGroup));
    this.setRowGroups(data, 0, this.groupByColumns, rootGroup);
    return this.getSublevel(data, 0, this.groupByColumns, rootGroup);
  }

  private setRowGroups<T>(data: T[], level: number, groupByColumns: IccGroupByColumn[], parent: IccRowGroup) {
    const groups = this.uniqueBy(
      data.map((row: any) => {
        const column = groupByColumns[0];
        //const find = this.rowGroups.find((item) => item.field === column.field);
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

  private getSublevel<T>(data: T[], level: number, groupByColumns: IccGroupByColumn[], parent: IccRowGroup): T[] {
    if (level >= groupByColumns.length) {
      return data as [];
    }
    const currentColumn = groupByColumns[level].field;
    let subGroups: T[] = [];
    this.rowGroups.forEach((group: IccRowGroup) => {
      if (group.level === level + 1) {
        const rowsInGroup = this.uniqueBy(
          data.filter(
            (row: T) => group.expanded && !(row instanceof IccRowGroup) && group.value === (row as any)[currentColumn],
          ),
          JSON.stringify,
        );
        const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group as IccRowGroup);
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
