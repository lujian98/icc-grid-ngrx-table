import { ComponentRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

export class IccDialogRef<T> {
  private onClose$: Subject<T> = new Subject();
  readonly onClose: Observable<T> = this.onClose$.asObservable();
  componentRef!: ComponentRef<T>;

  constructor(private overlayRef: OverlayRef) {}

  close(res?: any): void {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.onClose$.next(res!);
    this.onClose$.complete();
  }
}
