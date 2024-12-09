import { CommonModule } from '@angular/common';
import { IccMenusComponent } from '@icc/ui/menu';
import { take, timer } from 'rxjs';
import { IccAccordion } from './models/accordion.model';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import {
  IccLayoutComponent,
  IccLayoutHeaderComponent,
  IccLayoutHorizontalComponent,
  ICC_LAYOUT_HEADER_HEIGHT,
} from '@icc/ui/layout';

@Component({
  selector: 'icc-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccMenusComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutHorizontalComponent,
  ],
})
export class IccAccordionComponent {
  private elementRef = inject(ElementRef);
  private isFirstTime: boolean = true;
  private _items: IccAccordion[] = [];

  @Input()
  set items(val: IccAccordion[]) {
    this._items = val;
    if (this.isFirstTime) {
      this.isFirstTime = false;
      const expanded = this.items.filter((item) => item.expanded);
      if (expanded.length !== 1 && this.items.length > 0) {
        this.toggle(this.items[0], false);
      }
    }
  }
  get items(): IccAccordion[] {
    return this._items;
  }

  toggle(item: IccAccordion, currentExpanded: boolean): void {
    this.items = [...this.items].map((data) => {
      return {
        ...data,
        expanded: data.name === item.name ? !currentExpanded : false,
      };
    });
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
      const availaleH = clientHeight - children.length * ICC_LAYOUT_HEADER_HEIGHT - 10;
      if (availaleH < expandedChild.scrollHeight) {
        expandedChild!.style.setProperty('flex', `0 0 ${availaleH}px`);
      } else {
        expandedChild!.style.setProperty('flex', `0 0 auto`);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.setupLayout();
  }
}
