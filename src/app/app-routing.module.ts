import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'merge',
    loadChildren: () =>
      import('./pages/merge/merge.module').then((m) => m.MergeModule),
  },
  {
    path: 'compare',
    loadChildren: () =>
      import('./pages/compare/compare.module').then((m) => m.CompareModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/merge' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
