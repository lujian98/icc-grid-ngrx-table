import { AfterViewInit, Directive, ElementRef, Input, TemplateRef, Type, inject } from '@angular/core';
import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccTrigger,
} from '@icc/ui/overlay';
import { IccPopoverComponent } from './popover.component';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  standalone: true,
  providers: [IccDynamicOverlayService],
})
export class IccPopoverDirective implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private _context: Object = {};

  @Input('iccPopover')
  content!: Type<any> | TemplateRef<any>;

  @Input('iccPopoverContext')
  set context(value: {}) {
    this._context = { ...value };
    this.dynamicOverlayService.rebuild(this.context, this.content);
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
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      this.content,
      this.context,
    );
  }
}
