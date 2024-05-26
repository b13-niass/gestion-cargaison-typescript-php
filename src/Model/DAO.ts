import {DBStructure} from "../Interface/DataBinding.js";

export class DAO{
    private url: string;

    constructor(init?: Partial<DAO>) {
        Object.assign(this, init);
        this.url = "http://www.cheikh.ibrahima.dieng:8100/api-gc";
    }

    setUrl(url: string){
        this.url = url;
    }

    getData(): Promise<DBStructure>{
        return fetch(this.url, {
                method: 'GET'
        }).then(response =>  response.json()).catch(error => error);
    }
    postData(db: DBStructure):Promise<DBStructure>{
        return fetch(this.url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(db)
        }).then( response => response.json()).catch(error => error);
    }
}