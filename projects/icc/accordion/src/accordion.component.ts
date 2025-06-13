import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import {
  ICC_LAYOUT_HEADER_HEIGHT,
  IccLayoutComponent,
  IccLayoutHeaderComponent,
  IccLayoutHorizontalComponent,
} from '@icc/ui/layout';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { take, timer } from 'rxjs';
import { IccAccordion } from './models/accordion.model';

@Component({
  selector: 'icc-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IccIconModule,
    IccMenusComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutHorizontalComponent,
  ],
})
export class IccAccordionComponent {
  private readonly elementRef = inject(ElementRef);
  private isFirstTime: boolean = true;
  items$ = signal<IccAccordion[]>([]);
  items = input.required({
    transform: (items: IccAccordion[]) => {
      this.items$.update((current) => [...current, ...items]);
      if (this.isFirstTime) {
        this.isFirstTime = false;
        if (this.items$().length > 0) {
          const expanded = this.items$().filter((item) => item.expanded);
          if (expanded.length !== 1) {
            this.toggle(this.items$()[0], false);
          } else {
            this.toggle(expanded[0], false);
          }
        }
      }
      return items;
    },
  });
  iccMenuItemClick = output<IccMenuConfig>();

  onMenuItemClick(item: IccMenuConfig): void {
    this.iccMenuItemClick.emit(item);
  }

  toggle(item: IccAccordion, currentExpanded: boolean): void {
    this.items$.update((items) =>
      items.map((data) => ({
        ...data,
        expanded: data.name === item.name ? !currentExpanded : false,
      })),
    );

    timer(20)
      .pipe(take(1))
      .subscribe(() => this.setupLayout());
  }

  getTitle(item: IccAccordion): string {
    return item.title === undefined ? item.name : item.title;
  }

  getHeaderStyle(item: IccAccordion): string {
    return item?.expanded ? '1 1 auto' : `0 0 ${ICC_LAYOUT_HEADER_HEIGHT}px`;
  }

  private setupLayout(): void {
    const clientHeight = this.elementRef.nativeElement.clientHeight;
    const children: HTMLDivElement[] = Array.from(this.elementRef.nativeElement.children);
    const expanded = children.find((el) => el.children.length === 2);
    if (expanded) {
      const expandedChild = expanded?.children[1] as HTMLDivElement;
      const availaleH = clientHeight - children.length * ICC_LAYOUT_HEADER_HEIGHT - 0;
      if (availaleH < expandedChild.scrollHeight) {
        expandedChild!.style.setProperty('flex', `0 0 ${availaleH}px`);
      } else {
        expandedChild!.style.setProperty('flex', `0 0 auto`);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupLayout();
  }
}
