import {IProduit} from "../Interface/DataBinding.js";
import {Materiel} from "./Materiel.js";

export class Fragile extends Materiel{
    constructor(init?: Partial<IProduit>) {
        super(init);
    }
}