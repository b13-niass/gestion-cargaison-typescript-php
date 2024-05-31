import { DAO } from "./Model/DAO.js";
(async () => {
    /** Variable Declaration **/
    const headText = document.getElementById("head-text");
    const dao = new DAO();
    const DB = await dao.getData();
    console.log(DB);
    /** Function Declaration **/
    /** Initialisation **/
    headText.innerHTML = "Liste des produits";
    /** Event Declaration **/
})();
