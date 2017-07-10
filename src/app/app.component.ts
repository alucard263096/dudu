import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiConfig } from './api.config';
import { AppUtil } from './app.util';
import { AppMember } from './app.member';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, public loadCtrl: LoadingController, splashScreen: SplashScreen, storage: Storage) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        ApiConfig.SetLoadingCtrl(loadCtrl);
        AppUtil.Storage = storage;
        AppMember.GetInstance().loadLogin();
        
    });
  }
}
