import { NgModule } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@NgModule({
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzListModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    NzButtonModule,
    NzSelectModule,
    NzRadioModule
  ],
})
export class UILibSharedModule {}
