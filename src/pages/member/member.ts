import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';

/**
 * Generated class for the MemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-member',
    templateUrl: 'member.html',
})
export class MemberPage extends AppBase  {

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        super();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MemberPage');
    }
    openLogin() {
        var modal = this.modalCtrl.create("LoginPage");
        modal.present();
    }
    openSetting() {
        var modal = this.modalCtrl.create("MemberSettingPage");
        modal.present();

    }

}
