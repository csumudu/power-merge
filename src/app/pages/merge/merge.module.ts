import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeHomeComponent } from './merge-home/merge-home.component';
import { MergeRoutingModule } from './merge.routes';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { OpenEditorComponent } from './open-editor/open-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [MergeHomeComponent, OpenEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    NzButtonModule,
    MergeRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzListModule,
    NzIconModule,
    NzDropDownModule,
    NzSelectModule,
  ],
  exports: [MergeHomeComponent],
})
export class MergeModule {}
