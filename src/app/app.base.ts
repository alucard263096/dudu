import { ApiConfig } from "./api.config";
import { AppLang } from "./app.lang";

export class AppBase {
    public uploadpath: string = ApiConfig.getUploadPath();
    public Lang = AppLang.Lang;


}