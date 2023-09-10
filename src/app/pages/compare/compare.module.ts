import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { UILibSharedModule } from '../../ui-shared.module';
import { CompareHomeComponent } from './compare-home/compare-home.component';
import { CompareRoutingModule } from './compare.routes';

@NgModule({
  declarations: [CompareHomeComponent],
  imports: [
    CommonModule,
    CompareRoutingModule,
    MonacoEditorModule,
    FormsModule,
    ReactiveFormsModule,
    UILibSharedModule,
  ],
  exports: [CompareHomeComponent],
})
export class CompareModule {}
