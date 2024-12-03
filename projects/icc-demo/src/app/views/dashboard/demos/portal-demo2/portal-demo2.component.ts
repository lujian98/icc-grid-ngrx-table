import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './portal-demo2.component.html',
  styleUrls: ['./portal-demo2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class PortalDemo2Component implements OnInit {
  skills = [];
  values!: string;

  constructor() // private popoverRef: IccOverlayComponentRef<any>
  {}

  ngOnInit() {
    this.values = this.skills.toString().replace(/[',"]+/g, ', ');
  }
}
