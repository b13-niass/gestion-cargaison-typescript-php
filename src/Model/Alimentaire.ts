import {Produit} from "./Produit.js";
import {IProduit} from "../Interface/DataBinding.js";

export class Alimentaire extends Produit{
    constructor(init?: Partial<IProduit>) {
        super(init);
    }
}