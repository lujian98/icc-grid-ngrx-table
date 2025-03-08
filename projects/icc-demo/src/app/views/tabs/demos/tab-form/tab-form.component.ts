import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccButtonComponent } from '@icc/ui/button';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccTabsComponent, IccTabsConfig } from '@icc/ui/tabs';
import { AppForm1Component } from './form1.component';
import { AppForm2Component } from './form2.component';
import { AppForm3Component } from './form3.component';

@Component({
  selector: 'app-tab-form',
  template: `
    <icc-layout>
      <icc-layout-header>
        <button icc-button (click)="checkForm()">Check Form</button>
      </icc-layout-header>
      <icc-tabs [tabs]="tabs" [tabsConfig]="tabsConfig"> </icc-tabs>
    </icc-layout>
  `,
  styles: [':host {  display: flex; flex-direction: column; width: 450px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IccButtonComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    FormsModule,
    IccTabsComponent,
  ],
})
export class AppTabFormComponent {
  form: FormGroup = new FormGroup({
    fieldA: new FormControl('field A'),
    fieldTest3: new FormControl('Form Panel 3'),
  });

  tabsConfig: Partial<IccTabsConfig> = {
    enableContextMenu: true,
  };

  options = [];
  tabs = [
    {
      name: 'tab1',
      title: 'Form Panel 1',
      content: AppForm1Component,
      context: {
        form: this.form,
      },
    },
    {
      name: 'tab2',
      title: 'Form Panel 2',
      content: AppForm2Component,
      context: {
        form: this.form,
      },
    },
    {
      name: 'tab3',
      title: 'Form Panel 3',
      content: AppForm3Component,
      context: {
        form: this.form,
      },
    },
    {
      name: 'six',
      content: 'test 6',
      closeable: true,
    },
    {
      name: 'seven',
      content: 'test 7',
      closeable: true,
    },
  ];

  checkForm(): void {
    const values = this.form.value;
    console.log(' check form values =', values);
  }
}
