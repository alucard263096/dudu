import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { MemberApi } from '../../providers/member.api';
import { MemberinfoApi } from '../../providers/memberinfo.api';

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
    providers: [MemberApi,MemberinfoApi]
})
export class MemberInfoPage extends AppBase {
	sexual:string="";
	birth:string="";
	introduce:string="";

    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public toastCtrl:ToastController
        , public memberApi: MemberApi, public memberinfoApi: MemberinfoApi) {
        super();
    }
    dismiss(){
    	this.viewCtrl.dismiss();
    }
    save(){
    	var json={photo:this.Member.photo,name:this.Member.name,sexual:this.sexual,birth:this.birth,introduce:this.introduce};

    	this.memberinfoApi.singleupdate(json).then(data=>{
    		if(data.code==0){
	    		this.viewCtrl.dismiss();
    		}else{
    			this.toast(this.toastCtrl,this.Lang["updatefail"]);
    		}
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MemberInfoPage');
        var json=null;
        if(this.Member.oauthtype!=""){
        	json={oauthtype:this.Member.oauthtype,oauthunionid:this.Member.oauthunionid};
        }
        this.memberApi.info(json).then(data=>{

        //alert(JSON.stringify(data));
        	this.Member.name=data.name;
        	this.Member.photo=data.photo;
        	this.sexual=data.sexual;
        	this.birth=data.birth;
        	this.introduce=data.introduce;
        });
    }

}
