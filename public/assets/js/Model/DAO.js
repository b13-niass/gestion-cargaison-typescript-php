export class DAO {
    url;
    constructor(init) {
        Object.assign(this, init);
        this.url = "http://www.cheikh.ibrahima.dieng:8100/api-gc";
    }
    setUrl(url) {
        this.url = url;
    }
    getData() {
        return fetch(this.url, {
            method: 'GET'
        }).then(response => response.json()).catch(error => error);
    }
    postData(db) {
        return fetch(this.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(db)
        }).then(response => response.json()).catch(error => error);
    }
    async postDataGenPDF(data = null) {
        return await fetch("http://www.cheikh.ibrahima.dieng:8100/api2", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.blob())
            .catch(error => error);
    }
    async postDataOther(data = null) {
        return await fetch("http://www.cheikh.ibrahima.dieng:8100/api2", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .catch(error => error);
    }
}
