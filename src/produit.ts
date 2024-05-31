import {DAO} from "./Model/DAO.js";
import {DBStructure} from "./Interface/DataBinding.js";
import {ProduitFormHandler} from "./Model/ProduitFormHandler";

(async () => {
     /** Variable Declaration **/

    const headText : HTMLDivElement = document.getElementById("head-text") as HTMLDivElement;
    const dao = new DAO();
    const DB: DBStructure = await dao.getData();
    console.log(DB);

    /** Function Declaration **/

    /** Initialisation **/
    headText.innerHTML = "Liste des produits";

    /** Event Declaration **/

})()