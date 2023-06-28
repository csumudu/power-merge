import { RouterModule, Routes } from '@angular/router';
import { MergeHomeComponent } from './merge-home/merge-home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MergeHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MergeRoutingModule {}
