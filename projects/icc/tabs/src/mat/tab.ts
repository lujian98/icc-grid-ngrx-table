import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  booleanAttribute,
  inject,
} from '@angular/core';
import { IccTabContent } from './tab-content';
import { ICC_TAB, IccTabLabel } from './tab-label';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

export const ICC_TAB_GROUP = new InjectionToken<any>('ICC_TAB_GROUP');

@Component({
  selector: 'icc-tab',
  templateUrl: 'tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'iccTab',
  providers: [{ provide: ICC_TAB, useExisting: IccTab }],
  host: {
    hidden: '',
  },
})
export class IccTab implements OnInit, OnChanges, OnDestroy {
  private _viewContainerRef = inject(ViewContainerRef);
  _closestTabGroup = inject(ICC_TAB_GROUP, { optional: true });

  @Input({ transform: booleanAttribute })
  disabled: boolean = false;

  @ContentChild(IccTabLabel)
  get templateLabel(): IccTabLabel {
    return this._templateLabel;
  }
  set templateLabel(value: IccTabLabel) {
    this._setTemplateLabelInput(value);
  }
  private _templateLabel!: IccTabLabel;

  @ContentChild(IccTabContent, { read: TemplateRef, static: true })
  private _explicitContent: TemplateRef<any> = undefined!;

  @ViewChild(TemplateRef, { static: true }) _implicitContent!: TemplateRef<any>;

  @Input('label') textLabel: string = '';
  @Input('aria-label') ariaLabel!: string;
  @Input('aria-labelledby') ariaLabelledby!: string;
  @Input() labelClass!: string | string[];
  @Input() bodyClass!: string | string[];

  private _contentPortal: TemplatePortal | null = null;

  get content(): TemplatePortal | null {
    return this._contentPortal;
  }

  readonly _stateChanges = new Subject<void>();
  position: number | null = null;
  origin: number | null = null;
  isActive = false;

  constructor(...args: unknown[]);
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
      this._stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
  }

  private _setTemplateLabelInput(value: IccTabLabel | undefined) {
    if (value && value._closestTab === this) {
      this._templateLabel = value;
    }
  }
}
