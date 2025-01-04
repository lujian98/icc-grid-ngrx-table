import { IccRowGroup } from './row-group';
import { IccColumnConfig } from '../../models/grid-column.model';

export interface IccGroupByColumn {
  //column: string;
  title?: string;
  field: string;
}

export class IccRowGroups {
  private isGrouping!: boolean;
  private _groupByColumns: IccGroupByColumn[] = [];
  private _rowGroups: IccRowGroup[] = [];
  private _isCollapsing!: boolean;
  private _isExpanding!: boolean;

  set rowGroups(groups: IccRowGroup[]) {
    //console.log(' set row groups =', groups);
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

  get isRowGrouped(): boolean {
    return this.groupByColumns.length ? true : false;
  }

  get hasRowGroupCollapsed(): boolean {
    return this.isRowGrouped && this.rowGroups.filter((group) => !group.expanded).length > 0;
  }

  set isCollapsing(val: boolean) {
    this._isCollapsing = val;
  }

  get isCollapsing(): boolean {
    return this._isCollapsing;
  }

  set isExpanding(val: boolean) {
    this._isExpanding = val;
  }

  get isExpanding(): boolean {
    return this._isExpanding;
  }

  /*
  setRowGrouping(column: IccColumnConfig | boolean) {
    this.setGroupByColumns(column);
    this.isCollapsing = false;
    this.isExpanding = false;
  }

  private setGroupByColumns(column: IccColumnConfig | boolean) {
    if (typeof column !== 'boolean') {
      for (const group of this.groupByColumns) {
        if (group.column !== column.name) {
          this.rowGroups = [];
        }
      }
      this.groupByColumns = [
        {
          column: column.name,
          field: column.groupField !== true ? (column.groupField as string) : column.name,
        },
      ];
    } else {
      this.groupByColumns = [];
      this.rowGroups = [];
    }
  }*/

  setRowGroupExpand(row: IccRowGroup) {
    this.isCollapsing = row.expanded ? false : true;
    this.isExpanding = row.expanded ? true : false;
    if (this.rowGroups.length > 0) {
      let countCollapsed = 0;
      for (const group of this.rowGroups) {
        if (group.isSameGroup(row)) {
          group.expanded = row.expanded;
        }
        if (!group.expanded) {
          countCollapsed++;
        }
      }
    }
  }
  /*
  getRowGroupScrollPosition(end: number): number {
    let expandedCount = 0;
    let collapsedCount = 0;
    for (const group of this.rowGroups) {
      if (expandedCount <= end) {
        if (group.expanded) {
          expandedCount += group.totalCounts;
        }
        // if row group collapsed, this may cause the issue since the total counts may not know exactly
        if (!group.expanded) {
          collapsedCount += group.totalCounts;
        }
      }
    }
    return expandedCount + collapsedCount;
  }

  private resetRowCollapsed(prevRowGroups: IccRowGroup[]) {
    if (this.rowGroups.length > 0) {
      for (const group of this.rowGroups) {
        const findGroup = prevRowGroups.filter((pgroup: IccRowGroup) => group.isSameGroup(pgroup));
        if (findGroup.length === 1) {
          group.expanded = findGroup[0].expanded;
        }
      }
    }
  }


  setRowGroups<T>(data: T[]) {
    this.isGrouping = true;
    const prevRowGroups: IccRowGroup[] = [...this.rowGroups];
    this.rowGroups = [];
    const rootGroup = new IccRowGroup();
    rootGroup.expanded = true;
    this.getSublevel(data, 0, this.groupByColumns, rootGroup);
    this.resetRowCollapsed(prevRowGroups);
    this.isGrouping = false;
  }

  getRowGroupData<T>(data: T[]): T[] {
    this.isExpanding = false;
    this.isCollapsing = false;
    const groupedData = this.getGroupData(data);
    return this.getGroupExpandFilteredData(groupedData);
  }*/

  getGroupData<T>(data: T[]): T[] {
    this.isGrouping = true; // TODO ???
    this.rowGroups = [];
    const rootGroup = new IccRowGroup();
    rootGroup.expanded = true;
    data = [...data].filter((record) => !(record instanceof IccRowGroup));

    this.initialRowGroups(data, 0, this.groupByColumns, rootGroup);
    return this.getSublevel(data, 0, this.groupByColumns, rootGroup);
  }

  private getSublevel<T>(data: T[], level: number, groupByColumns: IccGroupByColumn[], parent: IccRowGroup): T[] {
    if (level >= groupByColumns.length) {
      return data as [];
    }
    //console.log( ' 1111111 data=', data)
    //console.log( ' 1111111 groupByColumns=', groupByColumns, ' level=', level, 'this.isGrouping=', this.isGrouping)

    //if (this.isGrouping) {
    // if (level === 0) {
    //  this.initialRowGroups(data, level, groupByColumns, parent);
    // }
    const currentColumn = groupByColumns[level].field;
    let subGroups: T[] = [];
    console.log(' 1111111 this.rowGroups=', this.rowGroups);
    this.rowGroups.forEach((group: IccRowGroup) => {
      //group.isDisplayed = false;
      group.isDisplayed = false;
      if (group.level === level + 1) {
        const rowsInGroup = this.uniqueBy(
          data.filter(
            (row: T) => group.expanded && !(row instanceof IccRowGroup) && group.value === (row as any)[currentColumn],
            // @ts-ignore
            //group.expanded && !(row instanceof IccRowGroup) && group[currentColumn] === (row as any)[currentColumn],
          ),
          JSON.stringify,
        );
        const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group as IccRowGroup);
        /*
        if (this.isGrouping && group.totalCounts === 0) {
          group.totalCounts = rowsInGroup.length;
        } else {
          if (rowsInGroup.length > 0) {
            group.isDisplayed = true;
            group.displayedCounts = rowsInGroup.length;
          }
          subGroups = subGroups.concat(group as T);
        }*/

        group.isDisplayed = true;
        group.displayedCounts = rowsInGroup.length;
        subGroups = subGroups.concat(group as T);
        subGroups = subGroups.concat(subGroup);
      }
    });
    //console.log( ' 22222222 subGroups=', subGroups)
    return subGroups;
  }

  private initialRowGroups<T>(data: T[], level: number, groupByColumns: IccGroupByColumn[], parent: IccRowGroup) {
    const groups = this.uniqueBy(
      data.map((row: any) => {
        const group = new IccRowGroup() as any;
        group.level = level + 1;
        group.parent = parent;
        for (let i = 0; i <= level; i++) {
          const column = groupByColumns[i];
          group.field = column.field;
          group.title = column.title!;
          group.value = row[column.field];

          //group[column.field] = row[column.field]; // TODO remove this ???
          //if (groupByColumns[i].column !== groupByColumns[i].field) {
          //  group.value = row[groupByColumns[i].column];
          //}
        }
        return group;
      }),
      JSON.stringify,
    );
    console.log(' 22222 groups=', groups);
    this.rowGroups = groups; //this.rowGroups.concat(groups);
  }

  uniqueBy<T>(a: T[], key: any) {
    const seen: { [index: string]: any } = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  private getGroupExpandFilteredData<T>(groupedData: any[]): T[] {
    const data = groupedData.filter((gdata) => {
      return this.filterGroupExpandedData(gdata, groupedData, this.groupByColumns);
    });
    return data;
  }

  private filterGroupExpandedData<T>(
    gdata: T[] | IccRowGroup,
    groupedData: any,
    groupByColumns: IccGroupByColumn[],
  ): boolean {
    return gdata instanceof IccRowGroup ? gdata.visible : this.getDataRowVisible(gdata, groupedData, groupByColumns);
  }

  private getDataRowVisible<T>(gdata: T[], groupedData: T[], groupByColumns: IccGroupByColumn[]): boolean {
    const groupRows = groupedData.filter((row: T) => {
      if (row instanceof IccRowGroup) {
        let match = true;
        //const nrow = row as { [index: string]: any };
        groupByColumns.forEach((group: any) => {
          const field = group.field;
          // if (!nrow[field] || !gdata[field] || nrow[field] !== gdata[field]) {
          if (!row.value || !gdata[field] || row.value !== gdata[field]) {
            match = false;
          }
        });
        return match;
      } else {
        return false;
      }
    });

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as any;
    return parent.visible && parent.expanded;
  }
}
