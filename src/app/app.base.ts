import { ApiConfig } from "./api.config";
import { AppLang } from "./app.lang";
import { ToastController } from 'ionic-angular';
import { AppMember } from './app.member';

export class AppBase {
    public uploadpath: string = ApiConfig.getUploadPath();
    public Lang = AppLang.Lang;
    public Member: AppMember = AppMember.GetInstance();

    public constructor() {

    }

    toast(toastCtrl: ToastController,msg:string) {
        let toast = toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}