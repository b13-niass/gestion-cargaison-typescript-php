import { DAO } from "./Model/DAO.js";
import { DbQuery } from "./Model/DbQuery.js";
(async () => {
    /** Variable Declaration **/
    // const headText : HTMLDivElement = document.getElementById("head-text") as HTMLDivElement;
    const headerBar = document.getElementById("header-bar");
    const dao = new DAO();
    const DB = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const productList = document.getElementById("product-list");
    const senderName = document.getElementById("sender-name");
    const receiverName = document.getElementById("receiver-name");
    const coliCargaison = document.getElementById("coli-cargaison");
    const myModal1 = document.getElementById("my_modal_1");
    const btnDeleteModal = document.querySelector(".btn-delete-modal");
    const btnCloseModal = document.querySelector(".btn-close-modal");
    const inputLibellep = document.querySelector("[id='libellep']");
    let codeDuProduit = "";
    /** Function Declaration **/
    const builTemplateProduitColi = (produit) => {
        const template = `<div class="product hover:cursor-pointer hover:bg-gray-400 flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg mb-2">
                    <span class="text-gray-700">${produit.libelle} - ${produit.typep} - ${produit.poids} kg</span>
                    <button data-codeProduit="${produit.code}" class="text-red-500 hover:text-red-700">Supprimer</button>
                </div>`;
        productList.insertAdjacentHTML("beforeend", template);
    };
    const onClickButtonDeleteColi = () => {
        const dataCodeProduit = document.querySelectorAll("[data-codeProduit]");
        dataCodeProduit.forEach(dc => {
            dc.addEventListener("click", (event) => {
                myModal1.classList.add("modal-open");
                codeDuProduit = dc.dataset.codeproduit;
            });
        });
    };
    /** Initialisation **/
    // headText.innerHTML = "Liste des produits";
    /** Event Declaration **/
    inputLibellep.addEventListener("input", (event) => {
        if (inputLibellep.value.length > 3) {
            let coli = dbQuery.findColiByCode(inputLibellep.value);
            if (coli != undefined) {
                senderName.innerHTML = coli.expediteur?.nom;
                receiverName.innerHTML = coli.destinataire?.nom;
                let currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == coli?.produits[0].cargaison);
                coliCargaison.innerHTML = currentICargaison.typec + ":" + currentICargaison.lieuDepart + "-" + currentICargaison.lieuArrive;
                coli.produits?.forEach(produit => {
                    builTemplateProduitColi(produit);
                });
                onClickButtonDeleteColi();
            }
            else {
                productList.innerHTML = '';
                senderName.innerHTML = '';
                receiverName.innerHTML = '';
                coliCargaison.innerHTML = '';
            }
        }
    });
    btnDeleteModal.addEventListener("click", async () => {
        let produit = dbQuery.findProduitByCode(codeDuProduit);
        if (produit != undefined) {
            let currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == produit?.getCargaison());
            // console.log(currentICargaison)
            // console.log(dbQuery.findColiByProduit(produit.getCode()))
            const DBresult = await dbQuery.supprimerProduitToCargaison(produit, currentICargaison);
            dbQuery.setDB(DB);
            const produitElement = document.querySelector(`[data-codeproduit="${produit.getCode()}"]`);
            produitElement.parentElement.remove();
            myModal1.classList.remove("modal-open");
        }
    });
    btnCloseModal.addEventListener("click", () => {
        myModal1.classList.remove("modal-open");
    });
})();
