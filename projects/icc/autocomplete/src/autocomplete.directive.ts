import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IccFormFieldComponent } from '@icc/ui/form-field';
import { IccOptionComponent } from '@icc/ui/option';
import {
  IccPosition,
  IccPositionBuilderService,
  IccTrigger,
  IccTriggerStrategy,
  IccTriggerStrategyBuilderService,
} from '@icc/ui/overlay';
import { ICC_DOCUMENT } from '@icc/ui/theme';
import { take, takeUntil, tap, timer } from 'rxjs';
import { IccAutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: '[iccAutocomplete]',
  standalone: true,
  host: {
    '(input)': '_handleInput($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccAutocompleteDirective),
      multi: true,
    },
  ],
})
export class IccAutocompleteDirective<T, G> implements ControlValueAccessor, OnInit, OnDestroy {
  private document = inject(ICC_DOCUMENT);
  @Input('iccAutocomplete') autocomplete!: IccAutocompleteComponent<T, G>;
  private overlayRef!: OverlayRef | null;
  private position: IccPosition = IccPosition.BOTTOM;
  private triggerStrategy!: IccTriggerStrategy;
  private trigger: IccTrigger = IccTrigger.FOCUS;
  private isShow: boolean = false;

  @Input('iccAutocompleteClose')
  set autocompleteClose(value: boolean) {
    if (coerceBooleanProperty(value)) {
      this.hide();
    }
  }

  @Input('iccAutocompleteClickOption')
  set autocompleteClickOption(clicked: number | undefined) {
    if (clicked) {
      console.log(' 44444 this.value =', this.autocomplete.value);
      this.setTriggerValue();
      this.change.emit(this.autocomplete.value);
      this._onChange(this.autocomplete.value);
      if (!this.autocomplete.multiSelection) {
        this.hide();
      }
    }
  }

  get origin(): HTMLInputElement {
    return this.host.nativeElement;
  }

  get inputHost(): ElementRef<HTMLInputElement> {
    return !this.formField
      ? this.host
      : this.formField.elementRef.nativeElement.querySelector('.icc-form-field-wrapper');
  }

  get formfieldWrapper(): HTMLInputElement {
    return this.formField.elementRef.nativeElement.querySelector('.icc-form-field-wrapper');
  }

  get width(): number {
    return !this.formField ? this.origin.offsetWidth : this._getFormfieldWidth('.icc-form-field-wrapper');
  }

  @Output() change = new EventEmitter<T | null>();
  @Output() isOverlayOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  _onChange: (value: T | null) => void = () => {};
  _onTouched = () => {};

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private vcr: ViewContainerRef,
    private overlay: Overlay,
    private overlayPositionBuilder: IccPositionBuilderService,
    private triggerStrategyBuilder: IccTriggerStrategyBuilderService<T>,
    @Optional() @Host() private formField: IccFormFieldComponent,
  ) {}

  ngOnInit(): void {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    this.triggerStrategy = this.triggerStrategyBuilder.build(
      !this.formField ? this.origin : this.formfieldWrapper,
      () => this.container(),
      this.trigger,
      this.formField,
    );
    this.triggerStrategy.show$.subscribe(() => this.show());
  }

  container<G>(): ComponentRef<G> {
    return {
      location: {
        nativeElement: this.overlayRef?.overlayElement,
      },
      // @ts-ignore
      hostView: null,
    };
  }

  private show(): void {
    if (!this.overlayRef) {
      this.showOverlay();
      this.isOverlayOpen.emit(true);
    }
  }

  private showOverlay(): void {
    this.isShow = true;
    this.overlayRef = this.overlay.create({
      width: this.width,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlayPositionBuilder.flexibleConnectedTo(this.inputHost, this.position, 0),
    });
    const template = new TemplatePortal(this.autocomplete.rootTemplate, this.vcr);
    this.overlayRef.attach(template);
    this.triggerStrategy.hide$
      .pipe(takeUntil(this.overlayRef.detachments().pipe(tap(() => this.hide()))))
      .subscribe(() => this.hide());

    this.autocomplete
      .optionsClick()
      .pipe(takeUntil(this.overlayRef.detachments()))
      .subscribe((option: IccOptionComponent<T>) => {
        this.autocomplete.setSelectionOption(option);
        console.log(' xxxxxxxxxxxxxxxxxxxx ');
        this.setTriggerValue();
        this.change.emit(this.autocomplete.value);
        this._onChange(this.autocomplete.value);
        if (!this.autocomplete.multiSelection) {
          this.hide();
        }
      });

    timer(10)
      .pipe(take(1))
      .subscribe(() => this.setOverlayHeight());
  }

  private setOverlayHeight(): void {
    const overlay = this.document.querySelector('.cdk-overlay-connected-position-bounding-box') as HTMLDivElement;
    overlay.style.height = 'unset';
    const overlayHeight = this.getOverlayHeight();
    const virtualScrollWrapper = overlay.querySelector('.cdk-virtual-scroll-content-wrapper') as HTMLDivElement;
    if (virtualScrollWrapper) {
      const styles = window.getComputedStyle(virtualScrollWrapper);
      const height = parseFloat(styles.height);
      if (height < 320) {
        const viewport = overlay.querySelector('cdk-virtual-scroll-viewport') as HTMLDivElement;
        viewport.style.flex = `1 1 ${height}px`;
      }
    } else {
      if (overlayHeight < 320) {
        const el = overlay.querySelector('.icc-option-list') as HTMLDivElement;
        //el.style.flex = `0 0 ${overlayHeight}px`;
      }
    }
  }

  // TODO to close to bottom
  private getOverlayHeight(): number {
    const el = this.formField?.elementRef?.nativeElement;
    if (el) {
      const pos = el.getBoundingClientRect();
      const height = el.offsetParent.clientHeight - pos.bottom;
      /* default .sun-option-list max-height: 20rem; is 320px */
      if (height < 320) {
        /* prevent blink if the height is negative or too small */
        const h = height < 20 ? 20 : height;
        return h;
        //return `${h}px`;
      }
    }
    return 320;
  }

  private setTriggerValue(): void {
    const inputValue = this.autocomplete.toDisplay;
    if (this.formField && inputValue) {
      this.formField.inputDirective.value = inputValue;
    } else {
      this.host.nativeElement.value = inputValue;
    }
  }

  private hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
      this._onTouched();
    }
    if (this.isShow) {
      this.isOverlayOpen.emit(false);
      this.isShow = false;
    }
  }

  private _getFormfieldWidth(name: string): number {
    return this.formField.elementRef.nativeElement.querySelector(name).offsetWidth;
  }

  writeValue(value: T): void {
    this.autocomplete.value = value;
    Promise.resolve(null).then(() => this.setTriggerValue());
  }

  registerOnChange(fn: (value: T | null) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.host.nativeElement.disabled = isDisabled;
  }

  _handleInput(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    let value: number | string | null = target.value;
    if (target.type === 'number') {
      value = value === '' ? null : parseFloat(value);
    }
    this._onChange(value as T);
  }

  ngOnDestroy(): void {
    this.hide();
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

  @HostListener('blur') onBlur(): void {
    if (!this.overlayRef) {
      this._onTouched();
    }
  }
}
