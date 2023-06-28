import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareHomeComponent } from './compare-home/compare-home.component';
import { CompareRoutingModule } from './compare.routes';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MergeRoutingModule } from '../merge/merge.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@NgModule({
  declarations: [CompareHomeComponent],
  imports: [
    CommonModule,
    CompareRoutingModule,
    MonacoEditorModule,
    FormsModule,
    ReactiveFormsModule,
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
    NzPageHeaderModule
  ],
  exports: [CompareHomeComponent],
})
export class CompareModule {}
