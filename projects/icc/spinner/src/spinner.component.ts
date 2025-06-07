import { ChangeDetectionStrategy, Component, HostBinding, input, signal } from '@angular/core';
import { IccSpinnerSize } from './spinner.model';

@Component({
  selector: 'icc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccSpinnerComponent {
  size = input('medium', {
    transform: (size: IccSpinnerSize) => {
      this._size.update(() => size);
      return size;
    },
  });
  message = input('', {
    transform: (message: string) => {
      this._message.update(() => message);
      return message;
    },
  });

  _size = signal<IccSpinnerSize>('medium');
  _message = signal<string>('');

  @HostBinding('class.size-small')
  get small() {
    return this._size() === 'small';
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this._size() === 'medium';
  }

  @HostBinding('class.size-large')
  get large() {
    return this._size() === 'large';
  }
}
