import {IProduit} from "../Interface/DataBinding.js";
import {Produit} from "./Produit.js";

export class Chimique extends Produit{
    protected toxicite?: number;
    constructor(init?: Partial<IProduit>) {
        super(init);
    }
}