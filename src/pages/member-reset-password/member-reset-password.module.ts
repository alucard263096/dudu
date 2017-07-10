import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberResetPasswordPage } from './member-reset-password';

@NgModule({
  declarations: [
    MemberResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberResetPasswordPage),
  ],
  exports: [
    MemberResetPasswordPage
  ]
})
export class MemberResetPasswordPageModule {}
