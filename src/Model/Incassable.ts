import {Materiel} from "./Materiel.js";
import {IProduit} from "../Interface/DataBinding.js";

export class Incassable extends Materiel{
    constructor(init?: Partial<IProduit>) {
        super(init);
    }
}