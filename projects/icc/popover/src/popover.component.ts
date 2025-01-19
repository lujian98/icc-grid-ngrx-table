import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  Type,
  ViewChild,
  HostBinding,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { IccDynamicOverlayService } from '@icc/ui/overlay';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IccOverlayModule } from '@icc/ui/overlay';
import { IccPortalComponent, IccRenderableContainer } from '@icc/ui/portal';

@Component({
  selector: 'icc-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccOverlayModule, IccPortalComponent],
})
export class IccPopoverComponent implements IccRenderableContainer {
  private viewContainerRef = inject(ViewContainerRef);
  @Input() content: any;
  @Input() context!: Object;
  @Input() dynamicOverlayService!: IccDynamicOverlayService;
  @Input() customStyle: string | undefined;

  @HostBinding('style')
  get style(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.customStyle || '');
  }

  @ViewChild(IccPortalComponent, { static: true })
  overlayContainer!: IccPortalComponent;

  constructor(private sanitizer: DomSanitizer) {}

  close(): void {
    this.dynamicOverlayService.hide();
  }

  renderContent(): void {
    this.detachContent();
    this.attachContent();
  }

  protected detachContent(): void {
    this.overlayContainer.detach();
  }

  protected attachContent(): void {
    if (this.content instanceof TemplateRef) {
      this.attachTemplate();
    } else if (this.content instanceof Type) {
      this.attachComponent();
    }
  }

  protected attachTemplate(): void {
    this.overlayContainer.attachTemplatePortal(
      new TemplatePortal(this.content, this.viewContainerRef, <any>{
        $implicit: this.context,
        close: this.close.bind(this),
      }),
    );
  }

  protected attachComponent(): void {
    const portal = new ComponentPortal(this.content, null, null);
    const context = Object.assign({}, this.context, {
      close: this.close.bind(this),
    });
    const ref = this.overlayContainer.attachComponentPortal(portal, context);
    ref.changeDetectorRef.detectChanges();
  }
}
