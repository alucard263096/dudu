import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';

/**
 * Generated class for the InputPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-input',
    templateUrl: 'input.html',
})
export class InputPage extends AppBase {

    title: string = "";
    placeholder: string = "";
    value: string = "";
    inputtype = "text";
    maxlength = 18;

    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
        super();
        this.title = navParams.get("title");
        this.placeholder = navParams.get("placeholder");
        this.value = navParams.get("value");
        if (navParams.get("inputtype") != null) {
            this.inputtype = navParams.get("inputtype");
        }
        if (navParams.get("maxlength") != null) {
            this.maxlength = navParams.get("maxlength");
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputPage');
    }
    change(ipt) {
        if (ipt.length > this.maxlength) {
            this.value = this.value.substring(0, this.maxlength);
        }
    }
    cancel() {
        this.viewCtrl.dismiss({ code: -1 });
    }
    ok() {
        this.viewCtrl.dismiss({ code: 0, value: this.value });
    }
}
