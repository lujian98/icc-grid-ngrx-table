export class IccRowGroup {
  level = 0;
  parent!: IccRowGroup;
  expanded = true;
  field = '';
  value = '';
  totalCounts = 0;
  isDisplayed = false;
  displayedCounts = 0;

  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }

  isSameGroup(group: IccRowGroup): boolean {
    // @ts-ignore
    return this.level === group.level && this.field === group.field && this[this.field] === group[group.field];
  }
}
