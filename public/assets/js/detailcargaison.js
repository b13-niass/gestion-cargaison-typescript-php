import { DAO } from "./Model/DAO.js";
import { DbQuery } from "./Model/DbQuery.js";
import { ProduitFormHandler } from "./Model/ProduitFormHandler.js";
(async () => {
    /** Variable Declaration **/
    const headText = document.getElementById("head-text");
    const dao = new DAO();
    let DB = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const produitFormHandler = new ProduitFormHandler("#formColis");
    let currentCargaisonCode;
    let nombreDeLigneDeProduit = 2;
    const alertSuccess = document.getElementById("alertSuccess");
    const alertDanger = document.getElementById("alertDanger");
    // console.log(dbQuery.findCargoByColi("#YX2213"));
    const templateToxicite = (numero) => {
        return `<label for="toxicite" class="block text-gray-700 mb-2">Toxicite:</label>
                <input type="text" id="toxicite" name="produit[${numero}][toxicite]" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>`;
    };
    if (localStorage.getItem("detailcargo")) {
        currentCargaisonCode = localStorage.getItem("detailcargo");
        // localStorage.removeItem("detailcargo");
    }
    else {
        window.location.href = "/cargo";
        return;
    }
    const currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
    // const numeroCargaisonEl = document.getElementById("numeroCargaison") as HTMLInputElement;
    /** Function Declaration **/
    const onChangeTypeProduit = () => {
        const typepAll = document.querySelectorAll("select[id='typep']");
        typepAll.forEach((select) => {
            select.addEventListener("change", (event) => {
                const parent = select.parentNode;
                console.log(parent);
                const voisinSuivant = select.parentNode.nextSibling.nextElementSibling;
                console.log();
                if (select.value == "chimique") {
                    voisinSuivant.innerHTML = templateToxicite(parseInt(parent.dataset.ligneproduit));
                }
                else {
                    voisinSuivant.innerHTML = ``;
                }
            });
        });
    };
    function generateRandomCode(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '#';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }
    /** Initialisation **/
    headText.innerHTML = "Ajouter un produit dans la cargaison";
    // numeroCargaisonEl.value = currentCargaisonCode;
    onChangeTypeProduit();
    /** Event Declaration **/
    produitFormHandler.handleSubmit(async (data) => {
        const formData = data;
        console.log(formData);
        const codeColi = generateRandomCode(7);
        const codeProduit = generateRandomCode(9);
        let coli = {
            code: codeColi,
            produits: formData.produit.map(p => {
                p.code = generateRandomCode(9);
                p.cargaison = currentCargaison.getNumeros();
                p.status = "en attente";
                return p;
            }),
            expediteur: {
                nom: formData.nomExpediteur,
                prenom: formData.prenomExpediteur,
                telephone: formData.telExpediteur,
                email: formData.emailExpediteur,
                ville: formData.villeExpediteur,
                pays: formData.paysExpediteur,
                code: codeColi
            },
            destinataire: {
                nom: formData.nomRecepteur,
                prenom: formData.prenomRecepteur,
                telephone: formData.telRecepteur,
                email: formData.emailRecepteur,
                ville: formData.villeRecepteur,
                pays: formData.paysRecepteur,
                code: codeColi
            },
        };
        if (dbQuery.isCargaisonOpened(currentCargaison.getNumeros()) && dbQuery.isCargaisonEnAttente(currentCargaison.getNumeros())
            && !dbQuery.isCargoFull(currentCargaison.getNumeros())) {
            const volumeContent = dbQuery.comptVolumeContentCargo(currentCargaison.getNumeros());
            if (currentCargaison.getPoidsMax() > 0) {
                let sommePoidsProduit = 0;
                coli.produits.forEach((p) => {
                    sommePoidsProduit += p.poids;
                });
                if ((sommePoidsProduit + volumeContent) <= currentCargaison.getPoidsMax()) {
                    alertSuccess.classList.remove("hidden");
                    alertDanger.classList.add("hidden");
                    DB = await dbQuery.addProduitToCargaison(currentCargaisonCode, coli);
                    produitFormHandler.resetForm();
                }
                else {
                    alertSuccess.classList.add("hidden");
                    alertDanger.classList.remove("hidden");
                }
            }
            else {
                let cpt = coli.produits.length;
                if ((cpt + volumeContent) <= currentCargaison.getNbrProduitMax()) {
                    alertSuccess.classList.remove("hidden");
                    alertDanger.classList.add("hidden");
                    DB = await dbQuery.addProduitToCargaison(currentCargaisonCode, coli);
                    produitFormHandler.resetForm();
                }
                else {
                    alertSuccess.classList.add("hidden");
                    alertDanger.classList.remove("hidden");
                }
            }
        }
        else {
            alertSuccess.classList.add("hidden");
            alertDanger.classList.remove("hidden");
        }
    });
})();
