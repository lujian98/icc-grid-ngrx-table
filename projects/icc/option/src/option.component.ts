import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'icc-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'option',
    '[class.selected]': 'selected',
  },
})
export class IccOptionComponent<T> implements OnDestroy {
  readonly elementRef = inject(ElementRef);
  selected: boolean = false;
  protected click$: Subject<IccOptionComponent<T>> = new Subject<IccOptionComponent<T>>();

  value = input<T>();

  get click(): Observable<IccOptionComponent<T>> {
    return this.click$.asObservable();
  }

  get content() {
    return this.elementRef.nativeElement.textContent;
  }

  @Output() change: EventEmitter<IccOptionComponent<T>> = new EventEmitter();

  select(): void {
    this.setSelection(true);
  }

  deselect(): void {
    this.setSelection(false);
  }

  private setSelection(selected: boolean): void {
    if (this.selected !== selected) {
      this.selected = selected;
      this.change.emit(this);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.click$.next(this);
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.click$.complete();
  }
}
