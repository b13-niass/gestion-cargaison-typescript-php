import { Cargaison } from "./Cargaison.js";
import {ICargaison} from "../Interface/DataBinding.js";

export class Aerienne extends Cargaison {
    constructor(init?: Partial<ICargaison>) {
        super(init);
    }

    getInfo(): string {
        return `Cargaison aerienne : Poids - ${this.numero}, Volume - ${this.typec}, Navire - ${this.poidsMax}`;
    }
}