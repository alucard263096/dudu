import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { ApiConfig } from '../../app/api.config';
import { AppUtil } from '../../app/app.util';
import { MemberApi } from '../../providers/member.api';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
    providers: [MemberApi]
})
export class RegisterPage extends AppBase {
    mobile: string = "";
    step = 1;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController
        , public memberApi: MemberApi) {
        super();
        this.mobile = navParams.get("mobile");
    }

    dimiss() {
        this.viewCtrl.dismiss();
    }
    back() {
        this.step--;
        if (this.step == 0) {
            this.dimiss();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }
    next1() {
        if (AppUtil.IsMobileNo(this.mobile) == false) {

            this.toast(this.toastCtrl, this.Lang["mobilecannotnull"]);
            return;
        }
        var json = { mobile: this.mobile };
        this.memberApi.checkmobileregister(json).then((data) => {
            if (data.code == 0) {
                if (data.return == true) {

                    this.toast(this.toastCtrl, this.Lang["mobilehaveregister"]);
                } else {
                    this.step++;
                }
            } else {

                this.toast(this.toastCtrl, this.Lang["mobilecannotnull"]);
            }
        });

    }

}
