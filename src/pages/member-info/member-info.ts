import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController, ActionSheetController  } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { MemberApi } from '../../providers/member.api';
import { MemberinfoApi } from '../../providers/memberinfo.api';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MemberInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-member-info',
    templateUrl: 'member-info.html',
    providers: [MemberApi, MemberinfoApi, Camera]
})
export class MemberInfoPage extends AppBase {
    sexual: string = "";
    birth;
    introduce: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController
        , public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController
        , private camera: Camera
        , public memberApi: MemberApi, public memberinfoApi: MemberinfoApi) {
        super();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    save() {
        var json = { photo: this.Member.photo, name: this.Member.name, sexual: this.sexual, birth: this.birth, introduce: this.introduce };

        this.memberinfoApi.singleupdate(json).then(data => {
            if (data.code == 0) {
                this.viewCtrl.dismiss();
            } else {
                this.toast(this.toastCtrl, this.Lang["updatefail"]);
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MemberInfoPage');
        var json = null;
        if (this.Member.oauthtype != "") {
            json = { oauthtype: this.Member.oauthtype, oauthunionid: this.Member.oauthunionid };
        }
        this.memberApi.info(json).then(data => {

            //alert(JSON.stringify(data));
            this.Member.name = data.name;
            this.Member.photo = data.photo;
            this.sexual = data.sexual;
            this.birth = data.birth;
            this.introduce = data.introduce;
        });
    }
    changeBirth(aa) {
        var birthstr = aa.year + "-" + (aa.month > 9 ? aa.month : "0" + aa.month) + "-" + (aa.day > 9 ? aa.day : "0" + aa.day);

        var json = { birth: birthstr };
        this.memberinfoApi.singleupdate(json).then(data => {
            if (data.code != 0) {
                this.toast(this.toastCtrl, this.Lang["updatefail"]);
            }
        });
    }
    changeSexual(ipt) {

        var json = { sexual: ipt };
        this.memberinfoApi.singleupdate(json).then(data => {
            if (data.code != 0) {
                this.toast(this.toastCtrl, this.Lang["updatefail"]);
            }
        });
    }
    changeName() {
        var modal = this.modalCtrl.create("InputPage", { title: this.Lang["name"], value: this.Member.name, placeholder: "" });
        modal.onDidDismiss(result => {
            if (result.code == 0) {
                var json = { name: result.value };
                this.memberinfoApi.singleupdate(json).then(data => {
                    if (data.code != 0) {
                        this.toast(this.toastCtrl, this.Lang["updatefail"]);
                    } else {

                        this.Member.name = result.value;
                        this.Member.store();
                    }
                });
            }
        });
        modal.present();
    }

    changeIntroduce() {
        var modal = this.modalCtrl.create("InputPage", { title: this.Lang["introduce"], value: this.introduce, placeholder: "", inputtype: "textarea", maxlength: 70 });
        modal.onDidDismiss(result => {
            if (result.code == 0) {
                var json = { introduce: result.value };
                this.memberinfoApi.singleupdate(json).then(data => {
                    if (data.code != 0) {
                        this.toast(this.toastCtrl, this.Lang["updatefail"]);
                    } else {

                        this.introduce = result.value;
                    }
                });
            }
        });
        modal.present();
    }

     options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    

    clickPhoto() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: this.Lang["selectfromalbum"],
                    handler: () => {

                    }
                }, {
                    text: this.Lang["takephoto"],
                    handler: () => {
                        this.camera.getPicture(this.options).then((imageData) => {
                            // imageData is either a base64 encoded string or a file URI
                            // If it's base64:
                            //let base64Image = 'data:image/jpeg;base64,' + imageData;
                            alert(imageData);
                        }, (err) => {
                            // Handle error
                        });
                    }
                }, {
                    text: this.Lang["cancel"],
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        actionSheet.present();
    }
}
