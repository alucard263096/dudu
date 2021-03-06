﻿import { NgModule, ErrorHandler, enableProdMode  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http'; //for 3.0
import { SQLite } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { MemberPage } from '../pages/member/member';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BannerDao } from "../providers/banner.dao";
import { PlaytypeDao } from "../providers/playtype.dao";

enableProdMode();
@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        HomePage,
        AboutPage,
        ContactPage,
        MemberPage
    ],
    imports: [
        HttpModule, //for 3.0
        BrowserModule, //for 3.0
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            iconMode: 'ios',
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',
            pageTransition: 'ios',
            backButtonIcon: "ios-arrow-back",
            statusbarPadding: false
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        HomePage,
        AboutPage,
        ContactPage,
        MemberPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        BannerDao,
        PlaytypeDao,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
