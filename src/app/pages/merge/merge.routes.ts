import { RouterModule, Routes } from '@angular/router';
import { MergeHomeComponent } from './merge-home/merge-home.component';
import { NgModule } from '@angular/core';
import { OpenEditorComponent } from './open-editor/open-editor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MergeHomeComponent },
  { path: 'open', component: OpenEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MergeRoutingModule {}
