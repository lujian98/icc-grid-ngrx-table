import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import { IccPortalContent } from './model';
import { IccOverlayComponentRef } from './overlay-component-ref';

@Component({
  selector: 'icc-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PortalModule],
})
export class IccPortalComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @Input() content!: IccPortalContent<T>;
  @Input() context!: {};
  @Input() withBackground!: boolean;
  portalType!: string;
  overlayComponentRef!: IccOverlayComponentRef<T>; // WARNING need this to bind TemplateRef close

  @ViewChild(CdkPortalOutlet) portalOutlet!: CdkPortalOutlet;

  constructor() {}

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
      const componentRef = this.portalOutlet.attachComponentPortal(portal);
      console.log(' componentRef=', componentRef);
      if (this.context) {
        Object.assign(componentRef.instance!, this.context);
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
      }
      //this.overlayComponentRef.componentRef = componentRef.instance;
      //this.overlayComponentRef.isComponentAttached$.next(true);
    } else if (this.content instanceof TemplateRef) {
      if (this.overlayComponentRef) {
        this.context = {
          // Using { $implicit: this.context } will not work bind close
          close: this.overlayComponentRef.close.bind(this.overlayComponentRef),
        };
      }
      // @ts-ignore
      const portal = new TemplatePortal(this.content, null, this.context);
      const templateRef = this.portalOutlet.attachTemplatePortal(portal);
      templateRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.portalOutlet.hasAttached()) {
      this.portalOutlet.detach();
    }
  }
}
