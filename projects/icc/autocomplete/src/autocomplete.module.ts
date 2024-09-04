import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccAutocompleteComponent } from './autocomplete.component';
import { IccAutocompleteDirective } from './autocomplete.directive';
import { IccAutocompleteContentDirective } from './autocomplete-content.directive';
import { IccOptionModule } from '@icc/ui/option';
import { IccOverlayModule } from '@icc/ui/overlay';

@NgModule({
  imports: [CommonModule, IccOptionModule, IccOverlayModule],
  declarations: [IccAutocompleteComponent, IccAutocompleteDirective, IccAutocompleteContentDirective],
  exports: [IccAutocompleteComponent, IccAutocompleteDirective, IccAutocompleteContentDirective],
})
export class IccAutocompleteModule {}
