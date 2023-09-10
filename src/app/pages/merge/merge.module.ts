import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { UILibSharedModule } from '../../ui-shared.module';
import { MergeHomeComponent } from './merge-home/merge-home.component';
import { MergeRoutingModule } from './merge.routes';
import { OpenEditorComponent } from './open-editor/open-editor.component';

@NgModule({
  declarations: [MergeHomeComponent, OpenEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    UILibSharedModule,
    MergeRoutingModule,
  ],
  exports: [MergeHomeComponent],
})
export class MergeModule {}
