import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationRoutingModule } from './translation.routes';
import { UILibSharedModule } from '../../ui-shared.module';
import { TranslationHomeComponent } from './translation-home/translation-home.component';
import { AnalizeHomeComponent } from './analize-home/analize-home.component';
import { GenerateHomeComponent } from './generate-home/generate-home.component';
import { CompareHomeComponent } from './compare-home/compare-home.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TranslationHomeComponent,
    AnalizeHomeComponent,
    GenerateHomeComponent,
    CompareHomeComponent,
  ],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    UILibSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
  ],
})
export class TranslationModule {}
