import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'icc-option',
  host: {
    role: 'option',
  },
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
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
  onClick(event: MouseEvent) {
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
