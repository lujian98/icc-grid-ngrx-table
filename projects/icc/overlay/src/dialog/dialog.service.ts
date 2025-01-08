import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, TemplateRef, Type, inject } from '@angular/core';
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
  private overlayService = inject(IccOverlayService);
  private injector = inject(Injector);

  constructor(
    @Inject(ICC_DOCUMENT) private document: Document,
    @Inject(ICC_DIALOG_CONFIG) private globalConfig: IccDialogConfig,
  ) {}

  open<T>(
    content: Type<T> | TemplateRef<T>,
    userConfig: Partial<IccDialogConfig<Partial<T> | string>> = {},
  ): IccDialogRef<T> {
    const config = new IccDialogConfig({ ...this.globalConfig, ...userConfig });
    const overlayRef = this.createOverlay(config);
    const dialogRef = new IccDialogRef<T>(overlayRef);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: IccDialogRef, useValue: dialogRef },
        { provide: ICC_DIALOG_CONFIG, useValue: config },
      ],
    });
    const container = this.createContainer(overlayRef, injector);
    this.createContent(config, content, container, dialogRef, injector);
    this.registerCloseListeners(config, overlayRef, dialogRef);
    return dialogRef;
  }

  private createOverlay(config: IccDialogConfig): IccOverlayRef {
    const positionStrategy = new GlobalPositionStrategy().centerHorizontally().centerVertically();
    return this.overlayService.create({
      positionStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
    });
  }

  private createContainer(overlayRef: IccOverlayRef, injector: Injector): IccPortalComponent {
    const containerPortal = new ComponentPortal(IccPortalComponent, null, injector);
    const containerRef = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private createContent<T>(
    config: IccDialogConfig,
    content: Type<T> | TemplateRef<T>,
    container: IccPortalComponent,
    dialogRef: IccDialogRef<T>,
    injector: Injector,
  ) {
    if (content instanceof TemplateRef) {
      // @ts-ignore
      const portal = new TemplatePortal(content, null, <any>{
        $implicit: config.context,
        dialogRef,
      });
      container.attachTemplatePortal(portal);
    } else {
      const portal = new ComponentPortal(content, null, injector);
      dialogRef.componentRef = container.attachComponentPortal(portal);
      if (config.context) {
        // @ts-ignore
        Object.assign(dialogRef.componentRef.instance, { ...config.context });
      }
    }
  }

  private registerCloseListeners<T>(config: IccDialogConfig, overlayRef: IccOverlayRef, dialogRef: IccDialogRef<T>) {
    if (config.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(() => dialogRef.close());
    }
    if (config.closeOnEsc) {
      fromEvent(this.document, 'keyup')
        .pipe(
          // @ts-ignore
          filter((event: KeyboardEvent) => event.keyCode === 27),
          takeUntil(dialogRef.onClose),
        )
        .subscribe(() => dialogRef.close());
    }
  }
}
