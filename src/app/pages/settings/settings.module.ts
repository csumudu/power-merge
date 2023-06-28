import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { SettingsRoutingModule } from './settings.routes';

@NgModule({
  declarations: [SettingsHomeComponent],
  imports: [CommonModule, SettingsRoutingModule],
  exports: [SettingsHomeComponent],
})
export class SettingsModule {}
