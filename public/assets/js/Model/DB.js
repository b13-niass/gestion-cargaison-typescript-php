import { Maritime } from "./Maritime.js";
import { Routiere } from "./Routiere.js";
import { Aerienne } from "./Aerienne";
export class DB {
    DB;
    constructor(DB) {
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
}
