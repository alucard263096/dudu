import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginSmsPage } from './login-sms';

@NgModule({
  declarations: [
    LoginSmsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginSmsPage),
  ],
  exports: [
    LoginSmsPage
  ]
})
export class LoginSmsPageModule {}
