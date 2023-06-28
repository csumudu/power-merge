import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompareHomeComponent } from './compare-home/compare-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CompareHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareRoutingModule {}
