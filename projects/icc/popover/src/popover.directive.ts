import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  Type,
  inject,
} from '@angular/core';
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
export class IccPopoverDirective implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  private elementRef = inject(ElementRef);
  private dynamicOverlayService = inject(IccDynamicOverlayService);

  @Input('iccPopover')
  content!: Type<any> | TemplateRef<any>;

  @Input('iccPopoverContext')
  context: Object = {};

  @Input('iccPopoverPosition')
  position: IccPosition = IccPosition.BOTTOM;

  @Input('iccPopoverTrigger')
  trigger: IccTrigger = IccTrigger.HOVER;

  @Input('iccPopoverStyle')
  style: string | undefined;

  @Input() popoverLevel = 0;

  private isFirstTime = true;

  ngOnInit(): void {
    //console.log(' hhhhhhhhuuuuuuuu isFirstTime  =', this.isFirstTime);
    //if (this.trigger === IccTrigger.HOVERCLICK && !this.isFirstTime) {
    // this.dynamicOverlayService.show(overlayServiceConfig.event);
    // this.dynamicOverlayService.show(overlayServiceConfig.event);
    //}
    //this.isFirstTime = false;
  }
  ngAfterViewInit(): void {
    console.log(' bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb =');
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger,
      position: this.position,
      popoverLevel: this.popoverLevel,
    };
    //console.log(' level =', this.popoverLevel);
    //console.log('ffffffffffffffff  this.trigger =', this.trigger);
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      this.content,
      this.context,
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(' hhhhhhhhhhhhhhhhh =', changes);
    // @ts-ignore
    if (changes.context) {
      this.dynamicOverlayService.rebuild(this.context, this.content);
    }
    //this.dynamicOverlayService.show();
  }

  ngOnDestroy(): void {
    //this.dynamicOverlayService.destroy();
  }
}
