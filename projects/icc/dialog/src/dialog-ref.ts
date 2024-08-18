import { ComponentRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

export class IccDialogRef<T> {
  componentRef!: ComponentRef<T>;

  protected onClose$: Subject<any> = new Subject();
  readonly onClose: Observable<any> = this.onClose$.asObservable();

  constructor(protected overlayRef: OverlayRef) {}

  close(res?: any) {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.onClose$.next(res);
    this.onClose$.complete();
  }
}
