import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
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
  },
})
export class IccOptionComponent implements OnDestroy {
  selected: boolean = false;
  protected alive: boolean = true;
  protected click$: Subject<IccOptionComponent> = new Subject<IccOptionComponent>();

  get click(): Observable<IccOptionComponent> {
    return this.click$.asObservable();
  }

  @Input() value: any;

  @HostBinding('class.selected')
  get selectedClass(): boolean {
    return this.selected;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.click$.next(this);

    event.preventDefault();
  }

  @Output() change: EventEmitter<IccOptionComponent> = new EventEmitter();

  constructor(public elementRef: ElementRef) {}

  get content() {
    return this.elementRef.nativeElement.textContent;
  }

  select(): void {
    this.setSelection(true);
  }

  deselect(): void {
    this.setSelection(false);
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.click$.complete();
  }

  protected setSelection(selected: boolean): void {
    if (this.alive && this.selected !== selected) {
      this.selected = selected;
      this.change.emit(this);
    }
  }
}
