import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './portal-demo.component.html',
  styleUrls: ['./portal-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PortalDemoComponent implements OnInit {
  skills = [];
  values!: string;

  constructor() {} // private popoverRef: IccOverlayComponentRef<any>

  ngOnInit() {
    this.values = this.skills.toString().replace(/[',"]+/g, ', ');
  }

  close() {
    // this.popoverRef.close({ id: 1 });
  }
}
