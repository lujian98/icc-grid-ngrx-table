import { ComponentRef, Injectable, Inject } from '@angular/core';
import { Observable, fromEvent, EMPTY, merge } from 'rxjs';
import { switchMap, debounceTime, filter, takeUntil, takeWhile, delay, repeat, map, share } from 'rxjs/operators';

import { ICC_DOCUMENT } from './document';
//import { IccFormFieldComponent } from '../../form-field/form-field/form-field.component';

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
  show$: Observable<never | Event>;
  hide$: Observable<never | Event>;

  destroy(): void;
}

export abstract class IccTriggerStrategyBase implements IccTriggerStrategy {
  protected alive = true;

  abstract show$: Observable<Event>;
  abstract hide$: Observable<Event>;

  destroy() {
    this.alive = false;
  }

  constructor(
    protected document: Document,
    protected host: HTMLElement,
    protected container: () => ComponentRef<any>,
    //protected formField?: IccFormFieldComponent
  ) {}
}

export class IccNoopTriggerStrategy extends IccTriggerStrategyBase {
  show$ = EMPTY;
  hide$ = EMPTY;
}

export class IccPointTriggerStrategy extends IccTriggerStrategyBase {
  show$ = EMPTY;
  private firstTime: boolean = true;
  protected click$: Observable<[boolean, Event]> = fromEvent<Event>(this.document, 'click').pipe(
    map((event: Event) => [!this.container(), event] as [boolean, Event]),
    share(),
    takeWhile(() => this.alive)
  );

  hide$ = this.click$.pipe(
    filter(
      ([shouldShow, event]) => {
        const container = this.container() && this.container().location.nativeElement.contains(event.target);
        if(this.firstTime) {
          this.firstTime = false;
          return shouldShow && !container;
        }
        console.log( ' shouldShow=', shouldShow)
        console.log( ' container=', this.container())
        console.log( ' event.target=', event.target)
        console.log( ' container2=', container)
        return !shouldShow && !container;
      }
    ),
    map(([, event]) => event),
    takeWhile(() => this.alive)
  );
}

export class IccClickTriggerStrategy extends IccTriggerStrategyBase {
  protected click$: Observable<[boolean, Event]> = fromEvent<Event>(this.document, 'click').pipe(
    map((event: Event) => [!this.container() && this.host.contains(event.target as Node), event] as [boolean, Event]),
    share(),
    takeWhile(() => this.alive)
  );

  show$ = this.click$.pipe(
    filter(([shouldShow]) => shouldShow),
    map(([, event]) => event),
    takeWhile(() => this.alive)
  );

  hide$ = this.click$.pipe(
    filter(
      ([shouldShow, event]) =>
        !shouldShow && !(this.container() && this.container().location.nativeElement.contains(event.target))
    ),
    map(([, event]) => event),
    takeWhile(() => this.alive)
  );
}

export class IccHoverTriggerStrategy extends IccTriggerStrategyBase {
  show$ = fromEvent<Event>(this.host, 'mouseenter').pipe(
    filter(() => !this.container()),
    delay(100),
    takeUntil(fromEvent<Event>(this.host, 'mouseleave')),
    repeat(),
    takeWhile(() => this.alive)
  );

  hide$ = fromEvent<Event>(this.host, 'mouseleave').pipe(
    switchMap(() =>
      fromEvent<Event>(this.document, 'mousemove').pipe(
        debounceTime(100),
        takeWhile(() => !!this.container()),
        filter(
          (event) =>
            !this.host.contains(event.target as Node) && !this.container().location.nativeElement.contains(event.target)
        )
      )
    ),
    takeWhile(() => this.alive)
  );
}

export class IccTooltipTriggerStrategy extends IccTriggerStrategyBase {
  show$ = fromEvent<Event>(this.host, 'mouseenter').pipe(
    filter(() => !this.container()),
    delay(750),
    takeUntil(fromEvent<Event>(this.host, 'mouseleave')),
    repeat(),
    takeWhile(() => this.alive)
  );

  hide$ = fromEvent<Event>(this.host, 'mouseleave').pipe(takeWhile(() => this.alive));
}

export class IccContextmenuTriggerStrategy extends IccTriggerStrategyBase {
  protected rightClick$: Observable<[boolean, Event]> = fromEvent<Event>(this.document, 'contextmenu').pipe(
    map((event: Event) => [this.host.contains(event.target as Node), event] as [boolean, Event]),
    share(),
    takeWhile(() => this.alive)
  );

  show$ = this.rightClick$.pipe(
    filter(([shouldShow]) => shouldShow),
    map(([, event]) => {
      event.preventDefault();
      return event;
    }),
    takeWhile(() => this.alive)
  );

  protected merged$ = merge(
    fromEvent<Event>(this.document, 'click'),
    this.rightClick$.pipe(
      filter(([shouldShow, event]) => !shouldShow),
      map(([, event]) => event)
    )
  );

  hide$ = this.merged$.pipe(
    filter((event) => !(this.container() && this.container().location.nativeElement.contains(event.target))),
    map((event) => event),
    takeWhile(() => this.alive)
  );
}

export class IccFocusTriggerStrategy extends IccTriggerStrategyBase {
  show$ = merge(
    fromEvent<Event>(this.host, 'focus'),
    fromEvent<Event>(this.host, 'click'),
    fromEvent<Event>(this.host, 'keydown')
  ).pipe(takeWhile(() => this.alive));

  hide$ = fromEvent<Event>(this.document, 'click').pipe(
    filter((event) => {
      const clickTarget = event.target as HTMLElement;
      const notOrigin = clickTarget !== this.host;
      const notOverlay = !(this.container() && this.container().location.nativeElement.contains(clickTarget));
      // const formField = this.formField ? this.formField.elementRef.nativeElement : null;
      // const notFormfield = !formField?.contains(clickTarget);
      return notOrigin && notOverlay; // && notFormfield;
    }),
    map((event) => event),
    takeWhile(() => this.alive)
  );
}

@Injectable()
export class IccTriggerStrategyBuilderService {
  constructor(@Inject(ICC_DOCUMENT) protected document: Document) {}

  build(host: HTMLElement, container: () => ComponentRef<any>, trigger: IccTrigger, formField?: any) {
    switch (trigger) {
      case IccTrigger.CLICK:
        return new IccClickTriggerStrategy(this.document, host, container);
      case IccTrigger.NOOP:
        return new IccNoopTriggerStrategy(this.document, host, container);
      case IccTrigger.POINT:
        return new IccPointTriggerStrategy(this.document, host, container);
      case IccTrigger.HOVER:
        return new IccHoverTriggerStrategy(this.document, host, container);
      case IccTrigger.CONTEXTMENU:
        return new IccContextmenuTriggerStrategy(this.document, host, container);
      case IccTrigger.TOOLTIP:
        return new IccTooltipTriggerStrategy(this.document, host, container);
      //case IccTrigger.FOCUS:
      //  return new IccFocusTriggerStrategy(this.document, host, container, formField);
      default:
        throw new Error('Unknown trigger provided.');
    }
  }
}
