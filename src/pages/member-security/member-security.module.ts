import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSecurityPage } from './member-security';

@NgModule({
  declarations: [
    MemberSecurityPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSecurityPage),
  ],
  exports: [
    MemberSecurityPage
  ]
})
export class MemberSecurityPageModule {}
