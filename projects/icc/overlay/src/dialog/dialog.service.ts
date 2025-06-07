import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ClassProvider, Inject, Injectable, Injector, TemplateRef, Type, inject } from '@angular/core';
import { IccPortalComponent } from '@icc/ui/portal';
import { ICC_DOCUMENT } from '@icc/ui/theme';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IccOverlayRef } from '../overlay/overlay.models';
import { IccOverlayService } from '../overlay/overlay.service';
import { IccDialogRef } from './dialog-ref';
import { ICC_DIALOG_CONFIG, IccDialogConfig } from './dialog.model';

@Injectable()
export class IccDialogService {
  private readonly overlayService = inject(IccOverlayService);
  private readonly injector = inject(Injector);

  constructor(
    @Inject(ICC_DOCUMENT) private document: Document,
    @Inject(ICC_DIALOG_CONFIG) private globalConfig: IccDialogConfig,
  ) {}

  open<T>(
    content: Type<T> | TemplateRef<T>,
    userConfig: Partial<IccDialogConfig<Partial<T> | string>> = {},
    provides: ClassProvider[] = [],
  ): IccDialogRef<T> {
    const config = new IccDialogConfig({ ...this.globalConfig, ...userConfig });
    const overlayRef = this.createOverlay(config);
    const dialogRef = new IccDialogRef<T>(overlayRef);
    const injector = Injector.create({
      parent: userConfig.injector || this.injector,
      providers: [
        ...provides,
        { provide: OverlayRef, useValue: overlayRef },
        { provide: IccDialogRef, useValue: dialogRef },
        { provide: ICC_DIALOG_CONFIG, useValue: config },
      ],
    });
    const portal = this.createContainer(overlayRef, injector);
    this.createContent(config, content, portal, dialogRef, injector);
    this.registerCloseListeners(config, overlayRef, dialogRef);
    return dialogRef;
  }

  private createOverlay(config: IccDialogConfig): IccOverlayRef {
    return this.overlayService.create({
      positionStrategy: this.overlayService.getPositionStrategy(config.hostElemRef),
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
    });
  }

  private createContainer<T>(overlayRef: IccOverlayRef, injector: Injector): IccPortalComponent<T> {
    const containerPortal = new ComponentPortal(IccPortalComponent, null, injector);
    const containerRef = overlayRef.attach(containerPortal);
    return containerRef.instance as IccPortalComponent<T>;
  }

  private createContent<T>(
    config: IccDialogConfig,
    content: Type<T> | TemplateRef<T>,
    portal: IccPortalComponent<T>,
    dialogRef: IccDialogRef<T>,
    injector: Injector,
  ) {
    if (content instanceof TemplateRef) {
      portal.createTemplatePortal(content, {
        $implicit: config.context,
        dialogRef,
      });
    } else {
      dialogRef.componentRef = portal.createComponentPortal(content, config.context, injector);
    }
  }

  private registerCloseListeners<T>(config: IccDialogConfig, overlayRef: IccOverlayRef, dialogRef: IccDialogRef<T>) {
    if (config.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(() => dialogRef.close());
    }
    if (config.closeOnEsc) {
      fromEvent(this.document, 'keyup')
        .pipe(
          filter((event: Event) => (event as KeyboardEvent).code === 'Escape'),
          takeUntil(dialogRef.onClose),
        )
        .subscribe(() => dialogRef.close());
    }
  }
}
