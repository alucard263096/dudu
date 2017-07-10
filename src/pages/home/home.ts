import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

import { AppBase } from '../../app/app.base';
import { BannerDao } from '../../providers/banner.dao';
import { PlaytypeDao } from '../../providers/playtype.dao';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends AppBase {
    banners = [];
    playtypes = [];
    supertype = "near";
    nears = [];
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public bannerDao: BannerDao, public playtypeDao: PlaytypeDao) {
        super();
        for (var i = 0; i < 100; i++) {
            this.nears.push(i);
        }
    }
    ionViewDidLoad() {
        this.bannerDao.list({ "status": "A", "markcode": "home", "orderby": "seq" })
            .then((data) => {
                this.banners = data;
            });
        this.playtypeDao.list({ "status": "A",  "orderby": "seq" })
            .then((data) => {
                this.playtypes = data;
            });

        this.navCtrl.push("MemberSettingPage");
    }
    clickBanner() {

    }

}
