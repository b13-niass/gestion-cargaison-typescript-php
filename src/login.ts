import {DAO} from "./Model/DAO.js";
import {DBStructure, ICargaison, IColi, ILogin, IProduit} from "./Interface/DataBinding.js";
import {LoginFormHandle} from "./Model/LoginFormHandle.js";
import {DbQuery} from "./Model/DbQuery.js";

(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB: DBStructure = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const formLoginGestionnaire = new LoginFormHandle("#formLoginGestionnaire");
    const closeNotification = document.getElementById('close-btn') as HTMLButtonElement;
    const notification = document.getElementById('notification') as HTMLDivElement;
    const productList = document.getElementById("product-list") as HTMLDivElement;
    const inputLibellep = document.querySelector("[id='libellep']") as HTMLInputElement;
    const senderName = document.getElementById("sender-name") as HTMLDivElement;
    const receiverName = document.getElementById("receiver-name") as HTMLDivElement;
    const coliCargaison = document.getElementById("coli-cargaison") as HTMLDivElement;

    /** Function Declaration **/

    const builTemplateProduitColi = (produit: IProduit,cargaison: ICargaison) => {
        const template: string = `<div class="product hover:cursor-pointer hover:bg-gray-200 flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg mb-2">
                    <span class="text-gray-700">${produit.libelle} - ${produit.typep} - ${produit.poids} kg</span>
                    <span class="badge badge-success">${produit.status}</span>
                </div>`;
        productList.insertAdjacentHTML("beforeend", template);
    }

    const showErrorNotification = () => {
        notification.classList.remove('hidden');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 60000);
    }

    /** Initialisation **/


    /** Event Declaration **/

    closeNotification.addEventListener('click', () => {
        notification.classList.add('hidden');
    });

    formLoginGestionnaire.handleSubmit(async (d ) => {
       const result = await dao.postDataOther({...d, ...{formulaires: "login"}});
        if(result){
            sessionStorage.setItem('ges', JSON.stringify(result));
            window.location.href = "/cargo";
        }else{
            showErrorNotification();
        }
    });

    inputLibellep.addEventListener("input", (event: Event)=>{
        if (inputLibellep.value.length > 3){
            let coli : IColi | undefined = dbQuery.findColiByCode(inputLibellep.value);
            if (coli != undefined){
                senderName.innerHTML = coli.expediteur?.nom!;
                receiverName.innerHTML = coli.destinataire?.nom!;
                let currentICargaison: ICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == coli?.produits![0].cargaison!)!;
                coliCargaison.innerHTML = currentICargaison.typec + ":" + currentICargaison.lieuDepart + "-"+ currentICargaison.lieuArrive
                coli.produits?.forEach(produit => {
                    builTemplateProduitColi(produit, currentICargaison);
                });

            }else {
                productList.innerHTML = '';
                senderName.innerHTML = '';
                receiverName.innerHTML = '';
                coliCargaison.innerHTML = '';
            }
        }
    })

    inputLibellep.addEventListener("keydown", (e: KeyboardEvent) => {
        if(e.key == "Backspace"){
            if (inputLibellep.selectionStart === 0 && inputLibellep.selectionEnd === inputLibellep.value.length) {
                productList.innerHTML = '';
                senderName.innerHTML = '';
                receiverName.innerHTML = '';
                coliCargaison.innerHTML = '';
            }
        }
    })
})()