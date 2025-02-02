import { ComponentRef, Inject, Injectable } from '@angular/core';
import { EMPTY, Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, delay, filter, map, repeat, share, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { IccFormFieldComponent } from '@icc/ui/form-field';
import { ICC_DOCUMENT } from '@icc/ui/theme';

export enum IccTrigger {
  CLICK = 'click',
  NOOP = 'noop',
  POINT = 'point',
  HOVER = 'hover',
  CONTEXTMENU = 'contextmenu',
  TOOLTIP = 'tooltip',
  FOCUS = 'focus',
}

export interface IccTriggerStrategy {
  show$: Observable<Event>;
  hide$: Observable<Event>;

  destroy(): void;
}

export abstract class IccTriggerStrategyBase<T> implements IccTriggerStrategy {
  protected alive = true;
  abstract show$: Observable<Event>;
  abstract hide$: Observable<Event>;

  destroy() {
    this.alive = false;
  }

  constructor(
    protected document: Document,
    protected host: HTMLElement,
    protected container: () => ComponentRef<T>,
    protected formField?: IccFormFieldComponent,
  ) {}
}

export class IccNoopTriggerStrategy<T> extends IccTriggerStrategyBase<T> {
  show$ = EMPTY;
  hide$ = EMPTY;
}

// ONLY USED
export class IccPointTriggerStrategy<T> extends IccTriggerStrategyBase<T> {
  show$ = EMPTY;
  private firstTime: boolean = false; // seems not needed
  protected click$: Observable<[boolean, Event]> = fromEvent<Event>(this.document, 'click').pipe(
    map((event: Event) => [!this.container(), event] as [boolean, Event]),
    share(),
    takeWhile(() => this.alive),
  );

  hide$ = this.click$.pipe(
    filter(([shouldShow, event]) => {
      if (this.firstTime) {
        this.firstTime = false;
        return shouldShow;
      }
      let show = true;
      const box = this.container() && this.container().location.nativeElement.getBoundingClientRect();
      if (box) {
        const { x, y } = event as MouseEvent;
        show = box.top < y && y < box.bottom && box.left < x && x < box.right;
      }
      return !shouldShow && !show;
    }),
    map(([, event]) => event),
    takeWhile(() => this.alive),
  );
}

export class IccClickTriggerStrategy<T> extends IccTriggerStrategyBase<T> {
  protected click$: Observable<[boolean, Event]> = fromEvent<Event>(this.document, 'click').pipe(
    map((event: Event) => [!this.container() && this.host.contains(event.target as Node), event] as [boolean, Event]),
    share(),
    takeWhile(() => this.alive),
  );

  show$ = this.click$.pipe(
    filter(([shouldShow]) => shouldShow),
    map(([, event]) => event),
    takeWhile(() => this.alive),
  );

  hide$ = this.click$.pipe(
    filter(
      ([shouldShow, event]) =>
        !shouldShow && !(this.container() && this.container().location.nativeElement.contains(event.target)),
    ),
    map(([, event]) => event),
    takeWhile(() => this.alive),
  );
}

export class IccHoverTriggerStrategy<T> extends IccTriggerStrategyBase<T> {
  show$ = fromEvent<Event>(this.host, 'mouseenter').pipe(
    filter(() => !this.container()),
    delay(100),
    takeUntil(fromEvent<Event>(this.host, 'mouseleave')),
    repeat(),
    takeWhile(() => this.alive),
  );

  hide$ = fromEvent<Event>(this.host, 'mouseleave').pipe(
    switchMap(() =>
      fromEvent<Event>(this.document, 'mousemove').pipe(
        debounceTime(100),
        takeWhile(() => !!this.container()),
        filter((event) => {
          return (
            !this.host.contains(event.target as Node) && !this.container().location.nativeElement.contains(event.target)
          );
        }),
      ),
    ),
    takeWhile(() => this.alive),
  );
}

export class IccTooltipTriggerStrategy<T> extends IccTriggerStrategyBase<T> {
  show$ = fromEvent<Event>(this.host, 'mouseenter').pipe(
    filter(() => !this.container()),
    delay(750),
    takeUntil(fromEvent<Event>(this.host, 'mouseleave')),
    repeat(),
    takeWhile(() => this.alive),
  );

  hide$ = fromEvent<Event>(this.host, 'mouseleave').pipe(takeWhile(() => this.alive));
}

export class IccContextmenuTriggerStrategy<T> extends IccTriggerStrategyBase<T> {
  protected rightClick$: Observable<[boolean, Event]> = fromEvent<Event>(this.document, 'contextmenu').pipe(
    map((event: Event) => [this.host.contains(event.target as Node), event] as [boolean, Event]),
    share(),
    takeWhile(() => this.alive),
  );

  show$ = this.rightClick$.pipe(
    filter(([shouldShow]) => shouldShow),
    map(([, event]) => {
      event.preventDefault();
      return event;
    }),
    takeWhile(() => this.alive),
  );

  protected merged$ = merge(
    fromEvent<Event>(this.document, 'click'),
    this.rightClick$.pipe(
      filter(([shouldShow, event]) => !shouldShow),
      map(([, event]) => event),
    ),
  );

  hide$ = this.merged$.pipe(
    filter((event) => !(this.container() && this.container().location.nativeElement.contains(event.target))),
    map((event) => event),
    takeWhile(() => this.alive),
  );
}

export class IccFocusTriggerStrategy<T> extends IccTriggerStrategyBase<T> {
  show$ = merge(
    fromEvent<Event>(this.host, 'focus'),
    fromEvent<Event>(this.host, 'click'),
    fromEvent<Event>(this.host, 'keydown'),
  ).pipe(takeWhile(() => this.alive));

  hide$ = fromEvent<Event>(this.document, 'click').pipe(
    filter((event) => {
      const clickTarget = event.target as HTMLElement;
      const notOrigin = clickTarget !== this.host;
      //console.log(' this.container()=', this.container());
      const notOverlay = !(this.container() && this.container().location.nativeElement.contains(clickTarget));
      const formField = this.formField ? this.formField.elementRef.nativeElement : null;
      const notFormfield = !formField?.contains(clickTarget);
      return notOrigin && notOverlay && notFormfield;
    }),
    map((event) => event),
    takeWhile(() => this.alive),
  );
}

@Injectable()
export class IccTriggerStrategyBuilderService<T> {
  constructor(@Inject(ICC_DOCUMENT) protected document: Document) {}

  build(host: HTMLElement, container: () => ComponentRef<T>, trigger: IccTrigger, formField?: IccFormFieldComponent) {
    switch (trigger) {
      case IccTrigger.CLICK:
        return new IccClickTriggerStrategy(this.document, host, container);
      case IccTrigger.NOOP:
        return new IccNoopTriggerStrategy(this.document, host, container);
      case IccTrigger.POINT:
        return new IccPointTriggerStrategy(this.document, host, container);
      case IccTrigger.HOVER:
        return new IccHoverTriggerStrategy(this.document, host, container, formField);
      case IccTrigger.CONTEXTMENU:
        return new IccContextmenuTriggerStrategy(this.document, host, container);
      case IccTrigger.TOOLTIP:
        return new IccTooltipTriggerStrategy(this.document, host, container, formField);
      case IccTrigger.FOCUS:
        return new IccFocusTriggerStrategy(this.document, host, container, formField);
      default:
        throw new Error('Unknown trigger provided.');
    }
  }
}
