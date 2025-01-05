export class IccRowGroup {
  level: number = 0; // Only support one level or use tree grid
  parent!: IccRowGroup;
  expanded: boolean = true;
  field: string = '';
  totalCounts = 0;
  displayedCounts = 0;

  private _value: string = '';

  set value(val: string) {
    this._value = val;
  }
  get value(): string {
    return this._value;
  }
}
