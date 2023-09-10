import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TranslationHomeComponent } from './translation-home/translation-home.component';
import { AnalizeHomeComponent } from './analize-home/analize-home.component';
import { GenerateHomeComponent } from './generate-home/generate-home.component';
import { CompareHomeComponent } from './compare-home/compare-home.component';

const routes: Routes = [
  {
    path: '',
    component: TranslationHomeComponent,
    children: [
      { path: '', redirectTo: 'analize', pathMatch: 'full' },
      {
        path: 'analize',
        component: AnalizeHomeComponent,
      },
      {
        path: 'generate',
        component: GenerateHomeComponent,
      },
      {
        path: 'diff',
        component: CompareHomeComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationRoutingModule {}
