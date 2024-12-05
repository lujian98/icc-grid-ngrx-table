import { CdkPortalOutlet, ComponentPortal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
export class IccPortalComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @Input() content!: IccPortalContent<T>;
  @Input() context!: {};
  portalType!: string;

  @ViewChild(CdkPortalOutlet) portalOutlet!: CdkPortalOutlet;

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
      if (this.context) {
        Object.assign(componentRef.instance!, this.context);
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
      }
    } else if (this.content instanceof TemplateRef) {
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
