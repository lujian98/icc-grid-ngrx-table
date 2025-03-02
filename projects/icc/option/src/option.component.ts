import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'icc-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  host: {
    role: 'option',
    '[class.selected]': 'selected',
  },
})
export class IccOptionComponent<T> implements OnDestroy {
  elementRef = inject(ElementRef);
  selected: boolean = false;
  protected click$: Subject<IccOptionComponent<T>> = new Subject<IccOptionComponent<T>>();

  @Input() value!: T;

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
