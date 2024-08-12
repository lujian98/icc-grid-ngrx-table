import { ChangeDetectionStrategy, Component, Input, OnInit, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccTextFilterComponent } from './text/text-filter.component';
import { IccColumnConfig } from '../../models/grid-column.model';

@Component({
  selector: 'icc-column-filter',
  templateUrl: 'column-filter.component.html',
  //styleUrls: ['column-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccTextFilterComponent,
  ],
})
export class IccColumnFilterComponent implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);

  @Input() column!: IccColumnConfig;
  //@Input() value!: any;

  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.loadComponent();
  }

  private loadComponent(): void {
    const cellComponent = IccTextFilterComponent; // this.column.component || // to dynamic components
    const componentRef = this.viewContainerRef.createComponent(cellComponent);
    componentRef.instance.column = this.column;
    //componentRef.instance.value = this.value;
  }
}
