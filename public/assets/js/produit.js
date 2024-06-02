import { DAO } from "./Model/DAO.js";
(async () => {
    /** Variable Declaration **/
    // const headText : HTMLDivElement = document.getElementById("head-text") as HTMLDivElement;
    const headerBar = document.getElementById("header-bar");
    const dao = new DAO();
    const DB = await dao.getData();
    const productList = document.getElementById("product-list");
    const inputLibellep = document.querySelector("[id='libellep']");
    console.log(DB);
    /** Function Declaration **/
    const builTemplateProduitColi = (produit, key) => {
        return `<div class="product flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg mb-2">
                    <span class="text-gray-700">Produit ${key}: ${produit.getLibelle()} - ${produit.getType()} - ${produit.getPoid()} kg</span>
                    <button data-codeProduit="${produit.getCode()}" class="text-red-500 hover:text-red-700">Supprimer</button>
                </div>`;
    };
    /** Initialisation **/
    // headText.innerHTML = "Liste des produits";
    /** Event Declaration **/
    inputLibellep.addEventListener("input", (event) => {
        if (inputLibellep.value.length > 3) {
        }
    });
})();
