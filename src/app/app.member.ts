import { Component } from '@angular/core';
import {AppUtil} from './app.util';
import { ApiConfig } from './api.config';

export class AppMember {
    private constructor() {

    }

    private static instance: AppMember;
    public id:string = "";
    public name: string = "";
    public photo: string = "";
    public loginname: string = "";
    public email: string = "";
    public mobile: string = "";
    public token: string = "";
    public oauthtype: string = "";
    public oauthunionid: string = "";

    public static GetInstance() {
        if (AppMember.instance == null) {
            AppMember.instance = new AppMember();
        }
        return AppMember.instance;
    }

    public setLogin(id, name, photo, loginname, email, mobile, token,oauthtype="",oauthunionid="") {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.photo = this.photo.indexOf("http") == 0 ? this.photo : ApiConfig.getUploadPath() + "member/" + this.photo;
        this.loginname = loginname;
        this.email = email;
        this.mobile = mobile;
        this.token = token;
        this.oauthtype = oauthtype;
        this.oauthunionid = oauthunionid;

        ApiConfig.SetToken(token, id);
        var json = {
            id: id,
            name: name,
            photo: photo,
            loginname: loginname,
            email: email,
            mobile: mobile,
            token: token,
            oauthtype: oauthtype,
            oauthunionid: oauthunionid
        };
        var jsonstr = JSON.stringify(json);
        AppUtil.Storage.set("memberlogin", jsonstr);
    }

    public loadLogin() {
        AppUtil.Storage.get("memberlogin").then(jsonstr => {
            if (jsonstr==null||jsonstr == "") {
                return;
            }
            var jsonstr = JSON.parse(jsonstr);
            this.id = jsonstr.id;
            this.name = jsonstr.name;
            this.photo = jsonstr.photo;
            this.loginname = jsonstr.loginname;
            this.email = jsonstr.email;
            this.mobile = jsonstr.mobile;
            this.token = jsonstr.token;
            this.oauthtype = jsonstr.oauthtype;
            this.oauthunionid = jsonstr.oauthunionid;
        });
    }

    public logout() {

        AppUtil.Storage.remove("memberlogin");
        AppMember.instance = new AppMember();

    }

    public isLogined() {
        return this.id.trim() != "";
    }

}