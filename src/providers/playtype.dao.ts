import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { AbstractDao } from "./dao.abstract";
import { Http } from '@angular/http';
import { PlaytypeApi } from "./playtype.api";

@Injectable()
export class PlaytypeDao extends AbstractDao {

    constructor(public http: Http, public sqlite: SQLite) {
        super(sqlite, http);
    }

	
				
		public tableName() {
			return "playtype";
		}

		public tableColumns(): Array<string> {
        var columns = new Array();
			columns["seq"] = "varchar";//顺序
			columns["name"] = "varchar";//名称
			columns["status"] = "varchar";//状态
			columns["status_name"] = "varchar";//状态
			columns["img"] = "varchar";//图片
			return columns;
		}
				
			   
	//获取游线类型列表，传入对应的搜索条件
	public list(search_condition, showLoadingModel: boolean = true) {
        let api: PlaytypeApi = new PlaytypeApi(this.http);
        return api.list(search_condition, showLoadingModel).then(data => {
            this.batchUpdate(data);
            return data;
        }).catch(e => {
            return this.simpleQuery(search_condition);
        });
    }
	
	
	//获取游线类型列表，传入对应的搜索条件
    public sync(search_condition = null, showLoadingModel: boolean = true) {
        let api: PlaytypeApi = new PlaytypeApi(this.http);
        return this.getLastestUpdatedTime().then((updatedate) => {
            if (updatedate == undefined) {
                return this.list(search_condition, showLoadingModel);
            }
            return api.list({ "lastupdatecalltime": updatedate }, showLoadingModel).then(data => {
                alert(JSON.stringify(data));
                return this.batchUpdate(data).then(() => {
                    this.updateLatestUpdatedTime();
                    if (search_condition == null) {
                        return null;
                    }
                    return this.simpleQuery(search_condition);
                });
            }).catch(() => {
                if (search_condition == null) {
                    return null;
                }
                this.simpleQuery(search_condition);
            });
        }).catch(e => {
            if (search_condition == null) {
                return null;
            }
            return this.simpleQuery(search_condition);
        });
    }



}