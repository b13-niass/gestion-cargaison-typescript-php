import { Produit } from "./Produit.js";
export class Chimique extends Produit {
    toxicite;
    constructor(init) {
        super(init);
    }
}
