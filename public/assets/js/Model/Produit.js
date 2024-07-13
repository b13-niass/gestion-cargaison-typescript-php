import { FormatDate } from "./FormatDate.js";
export class Produit {
    code;
    libelle;
    typep;
    poids;
    cargaison;
    status;
    constructor(init) {
        Object.assign(this, init);
    }
    getCode() {
        return this.code;
    }
    setCode(code) {
        this.code = code;
    }
    getLibelle() {
        return this.libelle;
    }
    setType(typep) {
        this.typep = typep;
    }
    getType() {
        return this.typep;
    }
    setPoid(poids) {
        this.poids = poids;
    }
    getPoid() {
        return this.poids;
    }
    setCargaison(cargaison) {
        this.cargaison = cargaison;
    }
    getCargaison() {
        return this.cargaison;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    info() {
        const formatDate = new FormatDate();
        const tr = document.createElement("tr");
        tr.className = "tr-hoverable border-b";
        tr.innerHTML = `
        `;
        return tr;
    }
}
