import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
  ComponentRef,
  EmbeddedViewRef,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
//import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

import { TemplateRef, Type } from '@angular/core';

export type IccPortalContent<T> = string | TemplateRef<T> | Type<T>;

export interface IccRenderableContainer {
  // @ts-ignore
  renderContent();
}

@Component({
  selector: 'icc-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PortalModule],
})
export class IccOverlayContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content!: IccPortalContent<any>;
  @Input() context!: {};
  portalType!: string;

  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.content instanceof Type) {
      this.portalType = 'component';
    } else if (this.content instanceof TemplateRef) {
      this.portalType = 'template';
    } else {
      this.portalType = 'text';
    }
  }

  ngAfterViewInit(): void {
    this.addPortalContent();
  }

  addPortalContent(): void {
    if (this.content instanceof Type) {
      const portal = new ComponentPortal(this.content);
      this.attachComponentPortal(portal, this.context);
      /*
      const componentRef = this.portalOutlet.attachComponentPortal(portal);
      if (this.context) {
        Object.assign(componentRef.instance!, this.context);
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
      }
        */
    } else if (this.content instanceof TemplateRef) {
      // @ts-ignore
      const portal = new TemplatePortal(this.content, null, this.context);
      this.attachTemplatePortal(portal);
      /*
      const templateRef = this.portalOutlet.attachTemplatePortal(portal);
      templateRef.detectChanges();
      */
    }
  }

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

  ngOnDestroy(): void {
    this.detach();
  }
}
