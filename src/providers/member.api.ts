import { Injectable } from '@angular/core';
import { Loading} from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MemberApi {

    constructor(public http: Http) {

    }

    

//
public bindmobile(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/bindmobile';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/bindmobile',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/bindmobile',data,err);
            });

        
    }


//
public checkmobileregister(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/checkmobileregister';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/checkmobileregister',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/checkmobileregister',data,err);
            });

        
    }


//
public info(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/info';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/info',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/info',data,err);
            });

        
    }


//
public login(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/login';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/login',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/login',data,err);
            });

        
    }


//
public register(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/register';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/register',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/register',data,err);
            });

        
    }


//
public resetpassword(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/resetpassword';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/resetpassword',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/resetpassword',data,err);
            });

        
    }


//
public smslogin(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/smslogin';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/smslogin',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/smslogin',data,err);
            });

        
    }


//
public smsregister(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/smsregister';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/smsregister',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/smsregister',data,err);
            });

        
    }


//
public smsresetpassword(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/smsresetpassword';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/smsresetpassword',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/smsresetpassword',data,err);
            });

        
    }


//
public wxappoauth(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/wxappoauth';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/wxappoauth',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/wxappoauth',data,err);
            });

        
    }


//
public sendregistersms(data, showLoadingModal:boolean=true) {
        var url = ApiConfig.getApiUrl()+'member/sendregistersms';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });

        let body=ApiConfig.ParamUrlencoded(data);

        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
              if(ApiConfig.DataLoadedHandle('member/sendregistersms',data,res)){
                  if(showLoadingModal){
      					     ApiConfig.DimissLoadingModal();
                  }
      				
      					 return res.json();
      				}else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                
                if(showLoadingModal){
					         ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('member/sendregistersms',data,err);
            });

        
    }


    

}
