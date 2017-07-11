import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
        super();
    }

    ionViewDidLoad() {
        
        console.log('ionViewDidLoad MemberSettingPage');
    }

    logout() {
        this.Member.logout();
        this.viewCtrl.dismiss();
    }
    gotoMemberInfo() {
        this.navCtrl.push("MemberInfoPage");
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}