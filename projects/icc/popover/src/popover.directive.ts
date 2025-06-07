import { AfterViewInit, Directive, ElementRef, inject, input, TemplateRef, Type } from '@angular/core';
import { DEFAULT_OVERLAY_SERVICE_CONFIG, IccOverlayServiceConfig, IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverService } from './popover-service';
import { IccPopoverComponent } from './popover.component';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  providers: [IccPopoverService],
})
export class IccPopoverDirective<T> implements AfterViewInit {
  private readonly elementRef = inject(ElementRef);
  private readonly popoverService = inject(IccPopoverService);
  content = input.required<Type<T> | TemplateRef<T>>({ alias: 'iccPopover' });
  context = input(undefined, {
    alias: 'iccPopoverContext',
    transform: (context: {}) => {
      this.popoverService.rebuild(context, this.content());
      return context;
    },
  });
  position = input<IccPosition>(IccPosition.BOTTOM, { alias: 'iccPopoverPosition' });
  trigger = input<IccTrigger>(IccTrigger.HOVER, { alias: 'iccPopoverTrigger' });
  style = input<string>('', { alias: 'iccPopoverStyle' });
  popoverLevel = input<number>(0);
  clickToClose = input<boolean>(false);

  ngAfterViewInit(): void {
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger(),
      position: this.position(),
      popoverLevel: this.popoverLevel(),
      clickToClose: this.clickToClose(),
    };
    this.popoverService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      this.content(),
      this.context()!,
    );
  }
}
