import {Aerienne} from "./Model/Aerienne.js";
import {CargaisonBuilder} from "./Model/CargaisonBuilder.js";
import {Maritime} from "./Model/Maritime.js";
import {DAO} from "./Model/DAO.js";
import {DBStructure} from "./Interface/DataBinding.js";

// const cargaison: Aerienne[] = DB.cargaison.map(c => new Aerienne(c));

// const air = new Aerienne();

// console.log(cargaison);
const a = 4;

const builder = new CargaisonBuilder<Maritime>(new Maritime());


// dao.postData().then(res => console.log(res)).catch(err => console.log(err));

console.log("index");
