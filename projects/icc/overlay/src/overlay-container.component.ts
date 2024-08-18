import { Component, ViewChild, ElementRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

export interface IccRenderableContainer {
  // @ts-ignore
  renderContent();
}

@Component({
  selector: 'icc-overlay-container',
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
})
export class IccOverlayContainerComponent {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  constructor(protected elementRef: ElementRef) {}

  attachComponentPortal<T>(portal: ComponentPortal<T>, context?: Object): ComponentRef<T> {
    const componentRef = this.portalOutlet.attachComponentPortal(portal);
    if (context) {
      // @ts-ignore
      Object.assign(componentRef.instance, context);
    }
    componentRef.changeDetectorRef.markForCheck();
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    const templateRef = this.portalOutlet.attachTemplatePortal(portal);
    templateRef.detectChanges();
    return templateRef;
  }

  detach() {
    if (this.portalOutlet.hasAttached()) {
      this.portalOutlet.detach();
    }
  }
}
