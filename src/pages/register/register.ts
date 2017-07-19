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
    name: string = "";
    mobile: string = "";
    password: string = "";
    verifycode: string = "";
    resendreminder = 0;
    step = 1;

   

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController
        , public memberApi: MemberApi) {
        super();
        this.mobile = navParams.get("mobile");
        if (this.mobile == undefined) {
            this.mobile = "";
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    back() {
        this.step--;
        if (this.step == 0) {
            this.dismiss();
        }
    }

    getTitle() {
        if (this.step == 1) {
            return this.Lang["registeraccount"];
        }
        if (this.step == 2) {
            return this.Lang["verifymobileno"];
        }
        if (this.step == 3) {
            return this.Lang["setpassword"];
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
                    this.sendVerifyCodeAgain();
                    this.step++;
                    
                }
            } else {

                this.toast(this.toastCtrl, this.Lang["mobilecannotnull"]);
            }
        });

    }
    sendVerifyCodeAgain() {
        this.memberApi.sendregistersms({ mobile: this.mobile }).then((data) => {
            if (data.code == 0 || data.result == "SUCCESS") {
                this.verifycode = "";
                this.reminderResend();
            } else if (data.result == "SENT_IN_MINUTE") {
                this.toast(this.toastCtrl, this.Lang["retryafterminute"]);
            } else {
                this.toast(this.toastCtrl, this.Lang["smssentfail"]);
            }
        });
    }

    reminderResend() {
        this.resendreminder = 60;
        var obj = this;
        var intervalObj = setInterval(function () {
            obj.resendreminder--;
            if (obj.resendreminder <= 0) {
                clearInterval(intervalObj);
            }
        }, 1000);
    }

    next2() {
        if (this.verifycode.toString().trim()=="") {
            this.toast(this.toastCtrl, this.Lang["verifycodecannotnull"]);
            return;
        }
        this.step++;
        
    }
    next3() {

        if (this.password.toString().trim() == "") {
            this.toast(this.toastCtrl, this.Lang["passwordcannotnull"]);
            return;
        }

        var json = { mobile: this.mobile, verifycode: this.verifycode, password: ApiConfig.MD5(this.password), name: this.name };
        this.memberApi.smsregister(json).then((data) => {
            if (data.code == -3) {
                this.toast(this.toastCtrl, this.Lang["mobilehaveregister"]);
            } else if (data.code == -1) {
                this.toast(this.toastCtrl, this.Lang["verifyincorrect"]);
            } else {
                //alert(JSON.stringify(data));
                data = data.return;
                this.Member.setLogin(data.id, data.name, data.photo, data.loginname, data.email, data.mobile, data.token, data.oauthtype, data.oauthunionid);
                this.viewCtrl.dismiss({ logined: true });
            }
        });
    }

}
