import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { IccTreeNode } from './tree-grid.model';

// TODO not used
export class IccTreeDataSource<T> extends DataSource<T> {
  get data(): IccTreeNode<T>[] {
    return this._data;
  }

  set data(data: IccTreeNode<T>[]) {
    // console.log( ' set data sourece aaaaaaaaaaa data=', data)
    this._data = data;
  }

  constructor(private _data: IccTreeNode<T>[]) {
    super();
  }

  connect(): Observable<T[]> {
    return of(this.data as T[]);
  }

  disconnect(): void {}
}
