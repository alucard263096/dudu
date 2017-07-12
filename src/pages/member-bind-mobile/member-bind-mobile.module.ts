import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberBindMobilePage } from './member-bind-mobile';

@NgModule({
  declarations: [
    MemberBindMobilePage,
  ],
  imports: [
    IonicPageModule.forChild(MemberBindMobilePage),
  ],
  exports: [
    MemberBindMobilePage
  ]
})
export class MemberBindMobilePageModule {}
