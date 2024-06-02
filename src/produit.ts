import {DAO} from "./Model/DAO.js";
import {DBStructure, ICargaison, IColi, IProduit} from "./Interface/DataBinding.js";
import {ProduitFormHandler} from "./Model/ProduitFormHandler";
import {Produit} from "./Model/Produit";
import {DbQuery} from "./Model/DbQuery.js";

(async () => {
     /** Variable Declaration **/

    // const headText : HTMLDivElement = document.getElementById("head-text") as HTMLDivElement;
     const headerBar : HTMLHeadElement = document.getElementById("header-bar") as HTMLHeadElement;
    const dao = new DAO();
    const DB: DBStructure = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const productList = document.getElementById("product-list") as HTMLDivElement;
    const senderName = document.getElementById("sender-name") as HTMLDivElement;
    const receiverName = document.getElementById("receiver-name") as HTMLDivElement;
    const coliCargaison = document.getElementById("coli-cargaison") as HTMLDivElement;
    const myModal1 = document.getElementById("my_modal_1") as HTMLDivElement;
    const btnDeleteModal = document.querySelector(".btn-delete-modal") as HTMLButtonElement;
    const btnCloseModal = document.querySelector(".btn-close-modal") as HTMLButtonElement;
    const inputLibellep = document.querySelector("[id='libellep']") as HTMLInputElement;
    let codeDuProduit : string = "";

    /** Function Declaration **/
    const builTemplateProduitColi = (produit: IProduit) => {
        const template: string = `<div class="product hover:cursor-pointer hover:bg-gray-400 flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg mb-2">
                    <span class="text-gray-700">${produit.libelle} - ${produit.typep} - ${produit.poids} kg</span>
                    <button data-codeProduit="${produit.code}" class="text-red-500 hover:text-red-700">Supprimer</button>
                </div>`;
        productList.insertAdjacentHTML("beforeend", template);
    }

    const onClickButtonDeleteColi = () => {
        const dataCodeProduit = document.querySelectorAll("[data-codeProduit]") as NodeListOf<HTMLButtonElement>;
        dataCodeProduit.forEach(dc => {
            dc.addEventListener("click", (event: Event) => {
                myModal1.classList.add("modal-open");
                codeDuProduit = dc.dataset.codeproduit!;
            })
        })
    }

    /** Initialisation **/
    // headText.innerHTML = "Liste des produits";

    /** Event Declaration **/
    inputLibellep.addEventListener("input", (event: Event)=>{
        if (inputLibellep.value.length > 3){
            let coli : IColi | undefined = dbQuery.findColiByCode(inputLibellep.value);
            if (coli != undefined){
                senderName.innerHTML = coli.expediteur?.nom!;
                receiverName.innerHTML = coli.destinataire?.nom!;
                let currentICargaison: ICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == coli?.produits![0].cargaison!)!;
                coliCargaison.innerHTML = currentICargaison.typec + ":" + currentICargaison.lieuDepart + "-"+ currentICargaison.lieuArrive
                coli.produits?.forEach(produit => {
                    builTemplateProduitColi(produit);
                });
                onClickButtonDeleteColi();

            }else {
                productList.innerHTML = '';
                senderName.innerHTML = '';
                receiverName.innerHTML = '';
                coliCargaison.innerHTML = '';
            }
        }
    })

    btnDeleteModal.addEventListener("click", async () => {
        let produit: Produit | undefined = dbQuery.findProduitByCode(codeDuProduit);
        if (produit != undefined){
            let currentICargaison: ICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == produit?.getCargaison())!;
            // console.log(currentICargaison)
            // console.log(dbQuery.findColiByProduit(produit.getCode()))
            const DBresult = await dbQuery.supprimerProduitToCargaison(produit,currentICargaison);
            dbQuery.setDB(DB);
            const produitElement = document.querySelector(`[data-codeproduit="${produit.getCode()}"]`) as HTMLDivElement;
            produitElement.parentElement!.remove();
            myModal1.classList.remove("modal-open");
        }
    })

    btnCloseModal.addEventListener("click", () => {
        myModal1.classList.remove("modal-open");
    })

})()