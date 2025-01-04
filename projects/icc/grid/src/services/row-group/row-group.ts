export class IccRowGroup {
  level: number = 0; // Only support one level or use tree grid
  parent!: IccRowGroup;
  expanded: boolean = true;
  field: string = '';
  displayedCounts = 0;

  private _title: string = '';
  private _value: string = '';

  set title(val: string) {
    this._title = val;
  }
  get title(): string {
    return this._title ? this._title : this.field;
  }

  set value(val: string) {
    this._value = val;
  }
  get value(): string {
    return this._value;
  }

  /*
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }*/

  /*
  isSameGroup(group: IccRowGroup): boolean {
    return this.level === group.level && this.field === group.field && this.value === group.value;
    // @ts-ignore
    //return this.level === group.level && this.field === group.field && this[this.field] === group[group.field];
  }*/
}
