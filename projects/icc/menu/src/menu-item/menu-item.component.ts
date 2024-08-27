import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  TemplateRef,
  Output,
  EventEmitter,
  HostBinding,
  DoCheck,
  Inject,
  Type,
  ComponentRef,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccIconModule } from '@icc/ui/icon';
import { IccMenuItem } from '../menu-item';
import { IccMenuService } from '../menu.service';


@Component({
  selector: '[icc-menu-item]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccIconModule,
  ],
  host: {
    '[attr.disabled]': 'disabled || null',
  },
})
export class IccMenuItemComponent implements DoCheck, OnInit, AfterViewInit {
  @Input() menuItem!: IccMenuItem;
  @Input() menuItemTpl!: TemplateRef<any>;
  @Input() menuType!: string;
  @Output() selectItem = new EventEmitter<IccMenuItem>();

  @HostBinding('class.menu-item-separator')
  get separator() {
    return this.menuItem.separator;
  }

  get disabled() {
    return this.menuItem.disabled;
  }

  constructor(
    // private elementRef: ElementRef,
    private iccMenuService: IccMenuService,
    protected cd: ChangeDetectorRef,
   // protected overlayService: IccOverlayService,
   // protected positionBuilderService: IccPositionBuilderService,
   // protected triggerStrategyBuilder: IccTriggerStrategyBuilderService,
    //@Inject(MENU_PANEL_TOKEN) private componentType: Type<any>
  ) {
    // this.menuPanelComponent = componentType;
  }

  ngDoCheck(): void {
    //this.toggleState = this.menuItem._expanded ? IccToggleStates.Expanded : IccToggleStates.Collapsed;
  }

  ngOnInit() {
    //this.toggleState = IccToggleStates.Collapsed;
  }

  ngAfterViewInit(): void {

  }

  onItemSelected(item: IccMenuItem): void {
    this.selectItem.emit(item);
  }

  itemClicked(event: MouseEvent, item: IccMenuItem) {
    if (item.disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // handle menu click except nested context menu
      this.iccMenuService.itemClick(item);
    }
  }
}
