import { AfterViewInit, Directive, ElementRef, Input, TemplateRef, Type, inject } from '@angular/core';
import { DEFAULT_OVERLAY_SERVICE_CONFIG, IccOverlayServiceConfig, IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverService } from './popover-service';
import { IccPopoverComponent } from './popover.component';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  providers: [IccPopoverService],
})
export class IccPopoverDirective<T> implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private popoverService = inject(IccPopoverService);
  private _context: Object = {};

  @Input('iccPopover')
  content!: Type<T> | TemplateRef<T>;

  @Input('iccPopoverContext')
  set context(value: {}) {
    this._context = { ...value };
    this.popoverService.rebuild(this.context, this.content);
  }
  get context(): {} {
    return this._context;
  }

  @Input('iccPopoverPosition')
  position: IccPosition = IccPosition.BOTTOM;

  @Input('iccPopoverTrigger')
  trigger: IccTrigger = IccTrigger.HOVER;

  @Input('iccPopoverStyle')
  style: string | undefined;

  @Input() popoverLevel = 0;
  @Input() clickToClose = false;

  ngAfterViewInit(): void {
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger,
      position: this.position,
      popoverLevel: this.popoverLevel,
      clickToClose: this.clickToClose,
    };
    this.popoverService.build(IccPopoverComponent, this.elementRef, overlayServiceConfig, this.content, this.context);
  }
}
