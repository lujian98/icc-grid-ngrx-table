import { ChangeDetectionStrategy, Component, Input, TemplateRef, Type, ViewChild, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { IccOverlayContainerComponent, IccRenderableContainer, IccDynamicOverlayService } from '@icc/ui/overlay';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IccOverlayModule } from '@icc/ui/overlay';
import { IccPopoverDirective } from './popover.directive';

@Component({
  selector: 'icc-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccOverlayModule, IccPopoverDirective],
})
export class IccPopoverComponent implements IccRenderableContainer {
  @Input() content: any;
  @Input() context!: Object;
  @Input() dynamicOverlayService!: IccDynamicOverlayService;
  @Input() customStyle: string | undefined;
  @HostBinding('style')
  get style(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.customStyle || '');
  }

  @ViewChild(IccOverlayContainerComponent, { static: true })
  overlayContainer!: IccOverlayContainerComponent;

  constructor(private sanitizer: DomSanitizer) {}

  close() {
    this.dynamicOverlayService.hide();
  }

  renderContent() {
    this.detachContent();
    this.attachContent();
  }

  protected detachContent() {
    this.overlayContainer.detach();
  }

  protected attachContent() {
    if (this.content instanceof TemplateRef) {
      this.attachTemplate();
    } else if (this.content instanceof Type) {
      this.attachComponent();
    }
  }

  protected attachTemplate() {
    this.overlayContainer.attachTemplatePortal(
      // @ts-ignore
      new TemplatePortal(this.content, null, <any>{
        $implicit: this.context,
        close: this.close.bind(this),
      }),
    );
  }

  protected attachComponent() {
    const portal = new ComponentPortal(this.content, null, null);

    console.log(' bbbbbbbbbbbb this.context=', this.context);
    /*
    let context = Object.assign({}, this.context, {
      close: this.close.bind(this),
    });*/

    const ref = this.overlayContainer.attachComponentPortal(portal, this.context);
    ref.changeDetectorRef.detectChanges();
  }
}
