import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IccPopoverDirective, IccPopoverModule } from '../shared/tooltip/directives/popover';
import { IccPortalComponent } from '../shared/tooltip/components/portal/portal.component';
import { IccOverlayComponentRef } from '../shared/tooltip/services/overlay/overlay-component-ref';

import { CommonModule } from '@angular/common';
import { IccD3Popover } from '../models';

@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccPopoverModule, IccPortalComponent],
})
export class IccD3PopoverComponent implements OnInit {
  data!: IccD3Popover; // TODO hover border color

  constructor(private overlayComponentRef: IccOverlayComponentRef<any>) {}

  ngOnInit(): void {}

  close(): void {
    this.overlayComponentRef.close({ id: 1 });
    // TODO this may not be enough to close tooltip need add close events subject to popover directive
  }
}
