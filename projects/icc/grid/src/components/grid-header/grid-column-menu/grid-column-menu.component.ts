import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccSortField } from '../../../models/grid-column.model';

@Component({
  selector: 'sun-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onClick($event)',
  },
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class IccGridColumnMenuComponent implements OnInit {
  private gridFacade = inject(IccGridFacade);
  private elementRef = inject(ElementRef);
  @Input() gridConfig!: IccGridConfig;
  @Input() column!: IccColumnConfig;
  constructor() { }

  ngOnInit() {
    console.log(' gridConfig=', this.gridConfig)
    console.log(' column=', this.column)
    this.gridFacade.selectColumnConfig(this.gridConfig.gridName).subscribe((column) => {
      console.log(' all column=', column)
    })
  }

  onClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) { // or some similar check
      // this.close();
    }
  }
}

/*
@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
})
class SomeComponent() {
  constructor(private _eref: ElementRef) { }

  onClick(event) {
   if (!this._eref.nativeElement.contains(event.target)) // or some similar check
     doSomething();
  }
}
*/
