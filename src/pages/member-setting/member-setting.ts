﻿import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AppBase} from '../../app/app.base';

/**
 * Generated class for the MemberSettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-member-setting',
    templateUrl: 'member-setting.html',
})
export class MemberSettingPage extends AppBase {

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
        super();
    }

    ionViewDidLoad() {
        if (this.Member.isLogined() == false) {
            var modal = this.modalCtrl.create("LoginPage");
            modal.onDidDismiss(data => {
                if (this.Member.isLogined() == false) {
                    //this.dismiss();
                }
            });
            modal.present();
        }
        console.log('ionViewDidLoad MemberSettingPage');
    }

    logout() {
        this.Member.logout();
        this.viewCtrl.dismiss();
    }
    gotoMemberInfo() {
        this.navCtrl.push("MemberInfoPage");
    }
    gotoMemberSecurity() {
        this.navCtrl.push("MemberSecurityPage");
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}