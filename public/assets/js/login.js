import { DAO } from "./Model/DAO.js";
import { LoginFormHandle } from "./Model/LoginFormHandle.js";
import { DbQuery } from "./Model/DbQuery.js";
(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const formLoginGestionnaire = new LoginFormHandle("#formLoginGestionnaire");
    const closeNotification = document.getElementById('close-btn');
    const notification = document.getElementById('notification');
    const productList = document.getElementById("product-list");
    const inputLibellep = document.querySelector("[id='libellep']");
    const senderName = document.getElementById("sender-name");
    const receiverName = document.getElementById("receiver-name");
    const coliCargaison = document.getElementById("coli-cargaison");
    /** Function Declaration **/
    const builTemplateProduitColi = (produit, cargaison) => {
        const template = `<div class="product hover:cursor-pointer hover:bg-gray-200 flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg mb-2">
                    <span class="text-gray-700">${produit.libelle} - ${produit.typep} - ${produit.poids} kg</span>
                    <span class="badge badge-success">${produit.status}</span>
                </div>`;
        productList.insertAdjacentHTML("beforeend", template);
    };
    const showErrorNotification = () => {
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 60000);
    };
    /** Initialisation **/
    /** Event Declaration **/
    closeNotification.addEventListener('click', () => {
        notification.classList.add('hidden');
    });
    formLoginGestionnaire.handleSubmit(async (d) => {
        const result = await dao.postDataOther({ ...d, ...{ formulaires: "login" } });
        if (result) {
            sessionStorage.setItem('ges', JSON.stringify(result));
            window.location.href = "/cargo";
        }
        else {
            showErrorNotification();
        }
    });
    inputLibellep.addEventListener("input", (event) => {
        if (inputLibellep.value.length > 3) {
            let coli = dbQuery.findColiByCode(inputLibellep.value);
            if (coli != undefined) {
                senderName.innerHTML = coli.expediteur?.nom;
                receiverName.innerHTML = coli.destinataire?.nom;
                let currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == coli?.produits[0].cargaison);
                coliCargaison.innerHTML = currentICargaison.typec + ":" + currentICargaison.lieuDepart + "-" + currentICargaison.lieuArrive;
                coli.produits?.forEach(produit => {
                    builTemplateProduitColi(produit, currentICargaison);
                });
            }
            else {
                productList.innerHTML = '';
                senderName.innerHTML = '';
                receiverName.innerHTML = '';
                coliCargaison.innerHTML = '';
            }
        }
    });
    inputLibellep.addEventListener("keydown", (e) => {
        if (e.key == "Backspace") {
            if (inputLibellep.selectionStart === 0 && inputLibellep.selectionEnd === inputLibellep.value.length) {
                productList.innerHTML = '';
                senderName.innerHTML = '';
                receiverName.innerHTML = '';
                coliCargaison.innerHTML = '';
            }
        }
    });
})();
