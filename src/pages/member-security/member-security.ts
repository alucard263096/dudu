﻿import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { MemberApi } from '../../providers/member.api';

/**
 * Generated class for the MemberSecurityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-member-security',
    templateUrl: 'member-security.html',
    providers: [MemberApi]
})
export class MemberSecurityPage extends AppBase {

    mobile: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController
        , public memberApi: MemberApi) {
        super();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MemberSecurityPage');
        this.memberApi.mobile(null).then(data => {
            this.mobile = data.mobile;
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    gotoBindMobile() {
        var modal = this.modalCtrl.create("MemberBindMobilePage");
        modal.onDidDismiss(result => {
            if (result.code == 0) {
                this.memberApi.mobile(null).then(data => {
                    this.mobile = data.mobile;
                });
            }
        });
        modal.present();
    }
}
