import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, Type, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IccDynamicOverlayService, IccOverlayModule } from '@icc/ui/overlay';
import { IccPortalComponent, IccRenderableContainer, IccPortalContent } from '@icc/ui/portal';

@Component({
  selector: 'icc-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.style]': 'style',
  },
  imports: [CommonModule, IccOverlayModule, IccPortalComponent],
})
export class IccPopoverComponent<T> implements IccRenderableContainer {
  @Input() content!: IccPortalContent<T>;
  @Input() context!: Object;
  @Input() dynamicOverlayService!: IccDynamicOverlayService<T>;
  @Input() customStyle: string | undefined;

  get style(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.customStyle || '');
  }

  @ViewChild(IccPortalComponent, { static: true })
  overlayContainer!: IccPortalComponent<T>;

  constructor(private sanitizer: DomSanitizer) {}

  close(): void {
    this.dynamicOverlayService.hide();
  }

  renderContent(): void {
    this.detachContent();
    this.attachContent();
  }

  private detachContent(): void {
    this.overlayContainer.detach();
  }

  private attachContent(): void {
    if (this.content instanceof TemplateRef) {
      const context = {
        $implicit: this.context,
        close: this.close.bind(this),
      };
      this.overlayContainer.createTemplatePortal(this.content, context);
    } else if (this.content instanceof Type) {
      const context = Object.assign({}, this.context, {
        close: this.close.bind(this),
      });
      this.overlayContainer.createComponentPortal(this.content, context);
    }
  }
}
