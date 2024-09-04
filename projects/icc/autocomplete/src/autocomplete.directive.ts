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
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import {
  IccPosition,
  IccPositionBuilderService,
  IccTrigger,
  IccTriggerStrategy,
  IccTriggerStrategyBuilderService,
} from '@icc/ui/overlay';
import { IccFormFieldComponent } from '@icc/ui/form-field';
import { IccOptionComponent } from '@icc/ui/option';
import { IccAutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: '[iccAutocomplete]',
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
export class IccAutocompleteDirective<T> implements ControlValueAccessor, OnInit, OnDestroy {
  @Input('iccAutocomplete') autocomplete!: IccAutocompleteComponent<T>;
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

  get origin(): HTMLInputElement {
    return this.host.nativeElement;
  }

  get inputHost(): ElementRef<HTMLInputElement> {
    return !this.formField
      ? this.host
      : this.formField.elementRef.nativeElement.querySelector('.icc-form-field-wrapper');
  }

  get width(): number {
    return !this.formField ? this.origin.offsetWidth : this._getFormfieldWidth('.icc-form-field-wrapper');
  }

  @Output() change = new EventEmitter<any>();
  @Output() isOverlayOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  _onChange: (value: any) => void = () => {};
  _onTouched = () => {};

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private vcr: ViewContainerRef,
    private overlay: Overlay,
    private overlayPositionBuilder: IccPositionBuilderService,
    private triggerStrategyBuilder: IccTriggerStrategyBuilderService,
    @Optional() @Host() private formField: IccFormFieldComponent,
  ) {}

  ngOnInit(): void {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    this.triggerStrategy = this.triggerStrategyBuilder.build(
      this.host.nativeElement,
      () => this.container(),
      this.trigger,
      this.formField,
    );
    this.triggerStrategy.show$.subscribe(() => this.show());
  }

  container(): ComponentRef<any> {
    // @ts-ignore
    return {
      location: {
        nativeElement: this.overlayRef?.overlayElement,
      },
      // @ts-ignore
      injector: null,
      // @ts-ignore
      instance: null,
      // @ts-ignore
      hostView: null,
      // @ts-ignore
      changeDetectorRef: null,
      // @ts-ignore
      componentType: null,
      // @ts-ignore
      destroy: null,
      // @ts-ignore
      onDestroy: null,
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
      height: this.getOverlayHeight(),
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
      .subscribe((option: IccOptionComponent) => {
        this.autocomplete.setSelectionOption(option);
        this.setTriggerValue();
        this.change.emit(this.autocomplete.value);
        this._onChange(this.autocomplete.value);
        if (!this.autocomplete.multiSelection) {
          this.hide();
        }
      });
  }

  private getOverlayHeight(): string | undefined {
    const el = this.formField?.elementRef?.nativeElement;
    if (el) {
      const pos = el.getBoundingClientRect();
      const height = el.offsetParent.clientHeight - pos.bottom;
      /* default .icc-option-list max-height: 20rem; is 320px */
      if (height < 320) {
        /* prevent blink if the height is negative or too small */
        const h = height < 20 ? 20 : height;
        return `${h}px`;
      }
    }
    return undefined;
  }

  private setTriggerValue(): void {
    const inputValue = this.autocomplete.toDisplay;
    if (this.formField && inputValue) {
      this.formField._control.value = inputValue;
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

  registerOnChange(fn: (value: T) => {}): void {
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
    this._onChange(value);
  }

  ngOnDestroy(): void {
    this.hide();
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

  @HostListener('blur') onBlur() {
    if (!this.overlayRef) {
      this._onTouched();
    }
  }
}
