import {Produit} from "./Produit.js";
import {IProduit} from "../Interface/DataBinding.js";

export abstract class Materiel extends Produit{
    protected constructor(init?: Partial<IProduit>) {
        super(init);
    }
}