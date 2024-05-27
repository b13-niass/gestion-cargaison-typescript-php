import { Maritime } from "./Maritime.js";
import { Routiere } from "./Routiere.js";
import { Aerienne } from "./Aerienne.js";
import { DAO } from "./DAO.js";
export class DbQuery {
    DB;
    dao;
    constructor(DB) {
        this.DB = DB;
        this.dao = new DAO();
    }
    setDB(DB) {
        this.DB = DB;
    }
    findAllTypeCargaison() {
        let maritime = this.DB.cargaison.maritime.values.map((c) => new Maritime(c));
        let routiere = this.DB.cargaison.routiere.values.map((c) => new Routiere(c));
        let aerienne = this.DB.cargaison.aerienne.values.map((c) => new Aerienne(c));
        return maritime.concat(routiere).concat(aerienne);
    }
    findAllMaritime() {
        return this.DB.cargaison.maritime.values.map((c) => new Maritime(c));
    }
    findAllRoutiere() {
        return this.DB.cargaison.routiere.values.map((c) => new Routiere(c));
    }
    findAllAerienne() {
        return this.DB.cargaison.aerienne.values.map((c) => new Aerienne(c));
    }
    findMaritimeById(id) {
        return new Maritime(this.DB.cargaison.maritime.values.find((c) => c.numero === id));
    }
    findRoutiereById(id) {
        return new Routiere(this.DB.cargaison.routiere.values.find((c) => c.numero === id));
    }
    findAerienneById(id) {
        return new Aerienne(this.DB.cargaison.aerienne.values.find((c) => c.numero === id));
    }
    filterForCargaisonMaritime(filterOptions) {
        const result = [];
        this.DB.cargaison.maritime.values.filter((c) => {
            let m = new Maritime(c);
            let cptFind = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())) {
                    cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length) {
                result.push(new Maritime(c));
            }
        });
        return result;
    }
    filterForCargaisonRoutiere(filterOptions) {
        const result = [];
        this.DB.cargaison.routiere.values.filter((c) => {
            let m = new Routiere(c);
            let cptFind = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())) {
                    cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length) {
                result.push(new Routiere(c));
            }
        });
        return result;
    }
    filterForCargaisonAerienne(filterOptions) {
        const result = [];
        this.DB.cargaison.aerienne.values.filter((c) => {
            let m = new Aerienne(c);
            let cptFind = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())) {
                    cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length) {
                result.push(new Aerienne(c));
            }
        });
        return result;
    }
    filterForAllCargaison(filterOptions) {
        let result = [];
        this.findAllTypeCargaison().filter(c => {
            let m = c;
            let cptFind = 0;
            for (const filterOptionsKey in filterOptions) {
                console.log(m[filterOptionsKey].toLowerCase());
                console.log(filterOptions[filterOptionsKey].toLowerCase());
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())) {
                    cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length) {
                result.push(c);
            }
        });
        return result;
    }
    filterForCargaison(filterOptions) {
        let result = [];
        if (Object.keys(filterOptions).length == 0) {
            result = this.findAllTypeCargaison();
        }
        else {
            if (Object.keys(filterOptions).some(key => key == "typec")) {
                if (filterOptions.typec == "routiere") {
                    result = this.filterForCargaisonRoutiere(filterOptions);
                }
                else if (filterOptions.typec == "maritime") {
                    result = this.filterForCargaisonMaritime(filterOptions);
                }
                else if (filterOptions.typec == "aerienne") {
                    result = this.filterForCargaisonAerienne(filterOptions);
                }
            }
            else {
                result = this.filterForAllCargaison(filterOptions);
            }
        }
        return result;
    }
    async addMaritime(cargaison) {
        this.DB.cargaison.maritime.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }
    async addRoutiere(cargaison) {
        this.DB.cargaison.routiere.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }
    async addAerienne(cargaison) {
        this.DB.cargaison.aerienne.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }
    async addCargaison(cargaison) {
        let result;
        if (cargaison.typec == "maritime") {
            result = await this.addMaritime(cargaison);
        }
        else if (cargaison.typec == "aerienne") {
            result = await this.addAerienne(cargaison);
        }
        else if (cargaison.typec == "routiere") {
            result = await this.addRoutiere(cargaison);
        }
        return result;
    }
}
