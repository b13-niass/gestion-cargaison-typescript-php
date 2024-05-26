import { Cargaison } from "./Cargaison.js";
export class Routiere extends Cargaison {
    constructor(init) {
        super(init);
    }
    getInfo() {
        return `Cargaison maritime : Poids - ${this.numero}, Volume - ${this.typec}, Navire - ${this.poidsMax}`;
    }
}
