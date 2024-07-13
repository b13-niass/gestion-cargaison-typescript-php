import {FormatDate} from "./FormatDate.js";
import {IProduit} from "../Interface/DataBinding.js";

export abstract class Produit{
    protected code?: string;
    protected libelle?: string;
    protected typep?: string;
    protected poids?: number;
    protected cargaison?: string;
    protected status?: string;

    constructor(init?: Partial<IProduit>) {
        Object.assign(this, init);
    }

    getCode(): string {
        return this.code!;
    }
    setCode(code: string){
        this.code = code;
    }
    getLibelle(): string {
        return this.libelle!;
    }
    setType(typep: string){
        this.typep = typep;
    }
    getType(): string {
        return this.typep!;
    }
    setPoid(poids: number){
        this.poids = poids;
    }
    getPoid(): number {
        return this.poids!;
    }
    setCargaison(cargaison : string){
        this.cargaison = cargaison;
    }
    getCargaison(): string {
        return this.cargaison!;
    }
    setStatus(status: string){
        this.status = status;
    }
    getStatus(): string {
        return this.status!;
    }

    info(): HTMLTableRowElement {
        const formatDate = new FormatDate();
        const tr: HTMLTableRowElement = document.createElement("tr");
        tr.className = "tr-hoverable border-b";
        tr.innerHTML = `
        `;
        return tr;
    }
}