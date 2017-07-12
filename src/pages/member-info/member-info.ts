import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController, ActionSheetController } from 'ionic-angular';
import { ApiConfig } from "../../app/api.config";
import { AppBase } from "../../app/app.base";
import { MemberApi } from '../../providers/member.api';
import { MemberinfoApi } from '../../providers/memberinfo.api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

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
    providers: [MemberApi, MemberinfoApi, Camera, Transfer]
})
export class MemberInfoPage extends AppBase {
    sexual: string = "";
    birth;
    introduce: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController
        , public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController
        , private camera: Camera, private transfer: Transfer
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




    clickPhoto() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: this.Lang["selectfromalbum"],
                    handler: () => {
                        let options: CameraOptions = {
                            quality: 75,
                            targetWidth: 200,
                            targetHeight: 200,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        this.camera.getPicture(options).then(imageData => {
                            //alert(imageData);
                            this.fileupload(imageData);
                            if (imageData.length > 10) {
                                //this.newPhotoData = imageData;
                                //this.imageData = "data:image/jpeg;base64," + imageData;
                                //this.isNeedModify = true;
                            }

                        });
                    }
                }, {
                    text: this.Lang["takephoto"],
                    handler: () => {
                        let options: CameraOptions = {
                            quality: 75,
                            targetWidth: 200,
                            targetHeight: 200,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            sourceType: this.camera.PictureSourceType.CAMERA,
                            encodingType: this.camera.EncodingType.JPEG
                        }
                        this.camera.getPicture(options).then(imageData => {
                            //alert(imageData);
                            this.fileupload(imageData);
                            if (imageData.length > 10) {
                                //this.newPhotoData = imageData;
                                //this.imageData = "data:image/jpeg;base64," + imageData;
                                //this.isNeedModify = true;
                            }

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
    fileupload(filepath) {
        let fileTransfer: TransferObject = this.transfer.create();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'photo.jpg'
        };


        fileTransfer.upload(filepath, ApiConfig.getFileUploadAPI() + "?field=file&module=member")
            .then((data) => {
                // success

                //alert(JSON.stringify(data));
                if (data.response.substring(0, 7) == "success") {
                    var photo = data.response.split('|~~|')[1];
                    //alert(photo);
                    var json = { photo: photo };
                    this.memberinfoApi.singleupdate(json).then(data => {
                        if (data.code != 0) {
                            this.toast(this.toastCtrl, this.Lang["updatefail"]);
                        } else {
                            this.Member.photo = photo;
                            this.Member.store();
                        }
                    });



                } else {
                    this.toast(this.toastCtrl, this.Lang["photoupladfail"]);
                }

            }, (err) => {
                // error

                this.toast(this.toastCtrl, this.Lang["photoupladfail"]);
            });

    }
}
