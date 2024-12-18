import { CdkPortalOutlet, ComponentPortal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import { IccPortalContent } from './model';

@Component({
  selector: 'icc-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PortalModule],
})
export class IccPortalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content!: IccPortalContent<any>;
  @Input() context!: {};
  portalType!: string;

  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

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
    } else if (this.content instanceof TemplateRef) {
      // @ts-ignore
      const portal = new TemplatePortal(this.content, null, this.context);
      this.attachTemplatePortal(portal);
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

  detach(): void {
    if (this.portalOutlet.hasAttached()) {
      this.portalOutlet.detach();
    }
  }

  ngOnDestroy(): void {
    this.detach();
  }
}
