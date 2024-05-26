import {Cargaison} from "./Cargaison.js";
import {ICargaison} from "../Interface/DataBinding.js";

export class Routiere extends Cargaison {
    constructor(init?: Partial<ICargaison>) {
        super(init);
    }

    getInfo(): string {
        return `Cargaison maritime : Poids - ${this.numero}, Volume - ${this.typec}, Navire - ${this.poidsMax}`;
    }
}