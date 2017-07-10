import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingPage } from './member-setting';

@NgModule({
  declarations: [
    MemberSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingPage),
  ],
  exports: [
    MemberSettingPage
  ]
})
export class MemberSettingPageModule {}
