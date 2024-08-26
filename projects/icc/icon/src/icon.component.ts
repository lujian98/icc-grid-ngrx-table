import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  Renderer2,
  ElementRef,
  HostBinding,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IccIconLibraries, IccIconDefinition } from './icon-libraries';

export type IccIconStatus = 'default' | 'primary' | 'warning' | 'danger' | 'success';

export interface IccIconConfig {
  icon: string;
  iconClass?: string | Array<string>;
  status?: IccIconStatus;
  title?: string;
}

@Component({
  selector: 'icc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccIconComponent implements OnChanges, OnInit {
  protected iconDef!: IccIconDefinition | void;
  protected prevClasses: string[] = [];

  @HostBinding('attr.title')
  title!: string | undefined;

  @HostBinding('class.status-default')
  get default() {
    return this.status === 'default';
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('innerHtml')
  html: SafeHtml = '';

  @Input() icon!: string;

  @Input() pack!: string;

  @Input() status?: IccIconStatus;

  @Input() iconClass?: string | Array<string>;

  @Input()
  get config(): string | IccIconConfig {
    return this._config;
  }
  set config(value: string | IccIconConfig) {
    this._config = value;

    if (typeof value === 'string') {
      this.icon = value;
    } else {
      this.icon = value.icon;
      this.status = value.status;
      this.title = value.title;
      this.iconClass = value.iconClass;
    }
  }

  protected _config!: string | IccIconConfig;

  constructor(
    protected iconLibrary: IccIconLibraries,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.iconDef = this.renderIcon(this.icon, this.pack);
  }

  ngOnChanges() {
    const iconDef = this.iconLibrary.getIcon(this.icon, this.pack);

    if (iconDef) {
      this.iconDef = this.renderIcon(this.icon, this.pack);
    } else {
      this.iconDef = this.clearIcon();
    }
  }

  renderIcon(name: string, pack?: string): IccIconDefinition | undefined {
    const iconDefinition = this.iconLibrary.getIcon(name, pack);

    if (!iconDefinition) {
      return undefined;
    }

    this.assignClasses(iconDefinition.icon.getClasses());

    const content = iconDefinition.icon.getContent();
    if (content) {
      this.html = this.sanitizer.bypassSecurityTrustHtml(content);
    }

    return iconDefinition;
  }

  protected assignClasses(classes: string[]) {
    if (this.iconClass) {
      let klasses: Array<string>;
      if (typeof this.iconClass === 'string') {
        klasses = this.iconClass.split(' ');
      } else {
        klasses = this.iconClass;
      }
      classes = classes.concat(klasses);
    }

    this.prevClasses.forEach((className: string) => {
      this.renderer.removeClass(this.el.nativeElement, className);
    });

    classes.forEach((className: string) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });

    this.prevClasses = classes;
  }

  protected clearIcon(): void {
    this.html = '';
    this.assignClasses([]);
  }
}
