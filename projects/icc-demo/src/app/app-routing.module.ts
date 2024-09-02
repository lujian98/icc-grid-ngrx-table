import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grid',
        loadChildren: () =>
          import('./examples/grid/grid-examples.module').then(
            (m) => m.AppGridExamplesModule,
          ),
      },
      {
        path: '**',
        redirectTo: '/grid',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
