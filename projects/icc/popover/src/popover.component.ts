import { ChangeDetectionStrategy, Component, Input, input, TemplateRef, Type, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IccOverlayModule } from '@icc/ui/overlay';
import { IccPortalComponent, IccPortalContent } from '@icc/ui/portal';
import { IccPopoverService } from './popover-service';
import { IccPopoverContainer } from './popover.model';

@Component({
  selector: 'icc-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.style]': 'style',
  },
  imports: [IccOverlayModule, IccPortalComponent],
})
export class IccPopoverComponent<T> implements IccPopoverContainer {
  private readonly sanitizer = inject(DomSanitizer);
  @Input() content!: IccPortalContent<T>;
  @Input() context!: Object;
  //content = input.required<IccPortalContent<T>>();
  popoverService = input.required<IccPopoverService<T>>();
  customStyle = input<string>('');

  get style(): SafeStyle {
    return this.customStyle ? this.sanitizer.bypassSecurityTrustStyle(this.customStyle()) : '';
  }

  @ViewChild(IccPortalComponent, { static: true }) portal!: IccPortalComponent<T>;

  close(): void {
    this.popoverService().hide();
  }

  renderContent(): void {
    this.detachContent();
    this.attachContent();
  }

  private detachContent(): void {
    this.portal.detach();
  }

  private attachContent(): void {
    if (this.content instanceof TemplateRef) {
      const context = {
        $implicit: this.context,
        close: this.close.bind(this),
      };
      this.portal.createTemplatePortal(this.content, context);
    } else if (this.content instanceof Type) {
      const context = Object.assign({}, this.context, {
        close: this.close.bind(this),
      });
      this.portal.createComponentPortal(this.content, context);
    }
  }
}
