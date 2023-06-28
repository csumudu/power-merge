import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsHomeComponent } from './settings-home/settings-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SettingsHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
