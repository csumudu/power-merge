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
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MergeHomeComponent],
  imports: [
    CommonModule,
    RouterModule,
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
  ],
  exports: [MergeHomeComponent],
})
export class MergeModule {}
