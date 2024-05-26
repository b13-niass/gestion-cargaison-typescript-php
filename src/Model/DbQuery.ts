import {DBStructure, ICargaison} from "../Interface/DataBinding.js";
import {Cargaison} from "./Cargaison";
import {Maritime} from "./Maritime.js";
import {Routiere} from "./Routiere.js";
import {Aerienne} from "./Aerienne.js";
import {DAO} from "./DAO.js";

export class DbQuery{
    private dao: DAO;
    constructor(private DB: DBStructure) {
        this.dao = new DAO();
    }

    findAllTypeCargaison(): Cargaison[] {
        let maritime: Cargaison[] = this.DB.cargaison.maritime.values.map((c) => new Maritime(c));
        let routiere: Cargaison[] = this.DB.cargaison.routiere.values.map((c) => new Routiere(c));
        let aerienne: Cargaison[] = this.DB.cargaison.aerienne.values.map((c) => new Aerienne(c));
        return maritime.concat(routiere).concat(aerienne);
    }

    findAllMaritime(): Cargaison[]{
        return this.DB.cargaison.maritime.values.map((c) => new Maritime(c));
    }

    findAllRoutiere(): Cargaison[]{
        return this.DB.cargaison.routiere.values.map((c) => new Routiere(c));
    }

    findAllAerienne(): Cargaison[]{
        return this.DB.cargaison.aerienne.values.map((c) => new Aerienne(c));
    }

    findMaritimeById(id: string): Cargaison{
        return new Maritime(this.DB.cargaison.maritime.values.find((c) => c.numero === id));
    }

    findRoutiereById(id: string): Cargaison{
        return new Routiere(this.DB.cargaison.routiere.values.find((c) => c.numero === id));
    }

    findAerienneById(id: string): Cargaison{
        return new Aerienne(this.DB.cargaison.aerienne.values.find((c) => c.numero === id));
    }

    filterForCargaisonMaritime(filterOptions:Record<string, any>): Cargaison[]{
        const result: Cargaison[] = [];
        this.DB.cargaison.maritime.values.filter((c) => {
            let m:Record<string, any> = new Maritime(c);
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                    cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                result.push(new Maritime(c));
            }
        })
        return result;
    }
    filterForCargaisonRoutiere(filterOptions:Record<string, any>): Cargaison[]{
        const result: Cargaison[] = [];
        this.DB.cargaison.routiere.values.filter((c) => {
            let m:Record<string, any> = new Routiere(c);
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                      cptFind ++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                 result.push(new Routiere(c));
             }
        })
        return result;
    }
    filterForCargaisonAerienne(filterOptions:Record<string, any>): Cargaison[]{
        const result: Cargaison[] = [];
        this.DB.cargaison.aerienne.values.filter((c) => {
            let m:Record<string, any> = new Aerienne(c);
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                     cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                 result.push(new Aerienne(c));
             }
        })
        return result;
    }
    filterForAllCargaison(filterOptions:Record<string, any>): Cargaison[]{
        let result: Cargaison[] = [];
        this.findAllTypeCargaison().filter(c => {
            let m:Record<string, any> = c;
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                console.log(m[filterOptionsKey].toLowerCase())
                console.log(filterOptions[filterOptionsKey].toLowerCase())
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                    cptFind ++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                 result.push(c);
             }
        })
        return result;
    }


    filterForCargaison(filterOptions:Record<string, any>): Cargaison[]{
        let result:Cargaison[] = [];
        if (Object.keys(filterOptions).length == 0){
            result = this.findAllTypeCargaison();
        }else {
            if(Object.keys(filterOptions).some(key => key == "typec")){
                if (filterOptions.typec == "routiere"){
                    result = this.filterForCargaisonRoutiere(filterOptions);
                }else if (filterOptions.typec == "maritime"){
                    result =  this.filterForCargaisonMaritime(filterOptions);
                }else if (filterOptions.typec == "aerienne"){
                    result =  this.filterForCargaisonAerienne(filterOptions);
                }
            }else {
                result =  this.filterForAllCargaison(filterOptions);
            }
        }
        return result;
    }

    async addMaritime(cargaison: ICargaison): Promise<DBStructure>{
        this.DB.cargaison.maritime.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }
    async addRoutiere(cargaison: ICargaison): Promise<DBStructure>{
        this.DB.cargaison.routiere.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }
    async addAerienne(cargaison: ICargaison): Promise<DBStructure>{
        this.DB.cargaison.aerienne.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }

    // addCargaison()
}