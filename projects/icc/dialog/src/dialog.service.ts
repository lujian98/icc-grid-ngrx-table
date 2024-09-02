import { Injectable, Inject, TemplateRef, Type, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  TemplatePortal,
  PortalInjector,
} from '@angular/cdk/portal';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ICC_DIALOG_CONFIG, IccDialogConfig } from './dialog-config';
import { IccOverlayService, IccOverlayRef } from '@icc/ui/overlay';
import { IccDialogRef } from './dialog-ref';
import { IccDialogContainerComponent } from './dialog-container/dialog-container.component';

@Injectable()
export class IccDialogService {
  constructor(
    @Inject(DOCUMENT) protected document: Document,
    @Inject(ICC_DIALOG_CONFIG) protected globalConfig: IccDialogConfig,
    protected overlay: IccOverlayService,
    protected injector: Injector,
  ) {}

  open<T>(
    content: Type<T> | TemplateRef<T>,
    userConfig: Partial<IccDialogConfig<Partial<T> | string>> = {},
  ): IccDialogRef<T> {
    const config = new IccDialogConfig({ ...this.globalConfig, ...userConfig });
    const overlayRef = this.createOverlay(config);
    const dialogRef = new IccDialogRef<T>(overlayRef);
    const container = this.createContainer(config, overlayRef);
    this.createContent(config, content, container, dialogRef);

    this.registerCloseListeners(config, overlayRef, dialogRef);

    return dialogRef;
  }

  protected createOverlay(config: IccDialogConfig): IccOverlayRef {
    const positionStrategy = new GlobalPositionStrategy()
      .centerHorizontally()
      .centerVertically();
    return this.overlay.create({
      positionStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
    });
  }

  protected createContainer(
    config: IccDialogConfig,
    overlayRef: IccOverlayRef,
  ): IccDialogContainerComponent {
    const injector = new PortalInjector(
      this.createInjector(config),
      new WeakMap([[IccDialogConfig, config]]),
    );
    const containerPortal = new ComponentPortal(
      IccDialogContainerComponent,
      null,
      injector,
    );
    const containerRef = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  protected createContent<T>(
    config: IccDialogConfig,
    content: Type<T> | TemplateRef<T>,
    container: IccDialogContainerComponent,
    dialogRef: IccDialogRef<T>,
  ) {
    if (content instanceof TemplateRef) {
      // @ts-ignore
      const portal = new TemplatePortal(content, null, <any>{
        $implicit: config.context,
        dialogRef,
      });
      container.attachTemplatePortal(portal);
    } else {
      const portalInjector = new PortalInjector(
        this.createInjector(config),
        new WeakMap([[IccDialogRef, dialogRef]]),
      );
      const portal = new ComponentPortal(content, null, portalInjector);
      dialogRef.componentRef = container.attachComponentPortal(portal);

      if (config.context) {
        // @ts-ignore
        Object.assign(dialogRef.componentRef.instance, { ...config.context });
      }
    }
  }

  protected createInjector(config: IccDialogConfig): Injector {
    return config.viewContainerRef?.injector || this.injector;
  }

  protected registerCloseListeners<T>(
    config: IccDialogConfig,
    overlayRef: IccOverlayRef,
    dialogRef: IccDialogRef<T>,
  ) {
    if (config.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(() => dialogRef.close());
    }

    if (config.closeOnEsc) {
      fromEvent(this.document, 'keyup')
        .pipe(
          // tslint:disable-next-line: deprecation
          // @ts-ignore
          filter((event: KeyboardEvent) => event.keyCode === 27),
          takeUntil(dialogRef.onClose),
        )
        .subscribe(() => dialogRef.close());
    }
  }
}
