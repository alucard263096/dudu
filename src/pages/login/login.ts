import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController  } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { ApiConfig } from '../../app/api.config';
import { AppUtil } from '../../app/app.util';
import { MemberApi } from '../../providers/member.api';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [MemberApi]
})
export class LoginPage extends AppBase {
    public logintype: string="sms";
    public mobile: string = "";
    public password: string = "";
    public verifycode: string = "";
    verifycodeReminder = 0;

    public wechatInstalled = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController
        , public memberApi: MemberApi) {
        super();
    }

    dimiss() {
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad LoginPage');
        this.checkWechatLogin();
    }
    gotoRegister() {
        var modal = this.modalCtrl.create("RegisterPage", { mobile: this.mobile });
        modal.onDidDismiss(data => {
            if (data.logined == true) {
                this.dimiss();
            }
        });
        modal.present();
    }
    login() {
        if (AppUtil.IsMobileNo(this.mobile) == false) {

            this.toast(this.toastCtrl, this.Lang["mobilecannotnull"]);
            return;
        }
        if (this.logintype == "pwd") {
            if (this.password.trim() == "") {
                this.toast(this.toastCtrl, this.Lang["passwordcannotnull"]);
                return;
            }
            var password = ApiConfig.MD5(this.password);

            var json = { mobile: this.mobile, password: password };
            this.memberApi.login(json).then((data) => {

                if (data.code == 0) {
                    this.Member.setLogin(data.return.id, data.return.name, data.return.photo,
                        data.return.loginname, data.return.email, data.return.mobile, data.return.token);
                    this.dimiss();
                } else {
                    this.toast(this.toastCtrl, this.Lang["invalidpassword"]);
                }
            });
        } else {

            if (this.verifycode.trim() == "") {
                this.toast(this.toastCtrl, this.Lang["verifycodecannotnull"]);
                return;
            }
            this.memberApi.smslogin({ mobile: this.mobile, verifycode: this.verifycode }).then((data) => {

                if (data.code == 0) {
                    this.Member.setLogin(data.return.id, data.return.name, data.return.photo,
                        data.return.loginname, data.return.email, data.return.mobile, data.return.token);
                    this.dimiss();
                } else if (data.code == -2) {
                    this.toast(this.toastCtrl, this.Lang["mobilenotregister"]);
                } else {
                    this.toast(this.toastCtrl, this.Lang["verifyincorrect"]);
                }
            });
        }
    }
    sendSmsLogin() {
        this.memberApi.sendloginsms({ "mobile": this.mobile }).then(data => {
            
            if (data.code == -3) {
                this.toast(this.toastCtrl, this.Lang["mobilenotregister"]);
            } else if (data.code == 0 || data.result == "SUCCESS") {
                this.verifycodeReminder = 60;
                var obj = this;
                var timeobj = setInterval(function () {
                    obj.verifycodeReminder--;
                    if (obj.verifycodeReminder <= 0)
                        clearInterval(timeobj);
                }, 1000);
            } else if (data.result == "SENT_IN_MINUTE") {
                this.toast(this.toastCtrl, this.Lang["retryafterminute"]);
            } else {
                this.toast(this.toastCtrl, this.Lang["smssentfail"]);
            }
        });
        
    }

    checkWechatLogin() {
        try {
            var loginpage = this;
            Wechat.isInstalled(function (installed) {
                loginpage.wechatInstalled = true;
            });
        } catch (e){

        }
    }

    wechatLogin() {
        var loginpage = this;
            var scope = "snsapi_userinfo",
                state = "_" + (+new Date());
            Wechat.auth(scope, state, function (response) {
                var json = { "oauthcode": response.code };
                //alert(response.code);

                loginpage.memberApi.wxappoauth(json).then(data => {
                    //alert(JSON.stringify(data));

                    loginpage.Member.setLogin(data.return.id, data.return.name, data.return.photo,
                        data.return.loginname, data.return.email, data.return.mobile, data.return.token, data.return.oauthtype, data.return.oauthunionid);

                    loginpage.dimiss();

                });

            }, function (reason) {

                });
    }
}
