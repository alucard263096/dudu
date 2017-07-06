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

    public mobile: string = "";
    public password: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController
        , public memberApi: MemberApi) {
        super();
    }

    dimiss() {
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad LoginPage');
        
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
        var password = ApiConfig.MD5(this.password);

        var json = { mobile: this.mobile, password: password };
        this.memberApi.login(json).then((data) => {

            if (data.code == 0) {
                alert("success");
            } else {
                this.toast(this.toastCtrl, this.Lang["invalidpassword"]);
            }
        });
    }

}
