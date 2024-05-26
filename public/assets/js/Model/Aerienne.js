import { Cargaison } from "./Cargaison.js";
export class Aerienne extends Cargaison {
    constructor(init) {
        super(init);
    }
    getInfo() {
        return `Cargaison aerienne : Poids - ${this.numero}, Volume - ${this.typec}, Navire - ${this.poidsMax}`;
    }
}
