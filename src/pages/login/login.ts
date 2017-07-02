import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';

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
})
export class LoginPage extends AppBase {

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
        super();
    }

    dimiss() {
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad LoginPage');

        


    }

}
