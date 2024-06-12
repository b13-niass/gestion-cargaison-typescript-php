import { DAO } from "./Model/DAO.js";
import { DbQuery } from "./Model/DbQuery.js";
import { ProduitFormHandler } from "./Model/ProduitFormHandler.js";
(async () => {
    /** Variable Declaration **/
    const logoutEl = document.getElementById("logout");
    const gestionaireName = document.getElementById("gestionaire-name");
    const gestionnaire = JSON.parse(sessionStorage.getItem('ges'));
    gestionaireName.innerText = gestionnaire.nom;
    logoutEl.addEventListener("click", (event) => {
        sessionStorage.removeItem('ges');
        location.href = '/login';
    });
    // const headText : HTMLDivElement = document.getElementById("head-text") as HTMLDivElement;
    const headerBar = document.getElementById("header-bar");
    const dao = new DAO();
    let DB = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const produitFormHandler = new ProduitFormHandler("#formColis");
    let currentCargaisonCode;
    let nombreDeLigneDeProduit = 2;
    const alertSuccess = document.getElementById("alertSuccess");
    const alertDanger = document.getElementById("alertDanger");
    const typeProduitContent = document.querySelectorAll(".typeProduitContent");
    const telExpediteur = document.getElementById("telExpediteur");
    const telRecepteur = document.getElementById("telRecepteur");
    const headInfoCargo = document.getElementById("headInfoCargo");
    const volumeInfoCargo = document.getElementById("volumeInfoCargo");
    const descInfoCargo = document.getElementById("descInfoCargo");
    // const montantInfoCargo = document.getElementById("montantInfoCargo") as HTMLDivElement;
    const dateDepartInfoCargo = document.getElementById("dateDepartInfoCargo");
    const dateArriveInfoCargo = document.getElementById("dateArriveInfoCargo");
    const changerEtatOuvert = document.getElementById("changerEtatOuvert");
    const changerEtatFermer = document.getElementById("changerEtatFermer");
    const changerEtatEnAttente = document.getElementById("changerEtatEnAttente");
    const changerEtatPerdue = document.getElementById("changerEtatPerdue");
    const changerEtatEnCours = document.getElementById("changerEtatEnCours");
    const changerEtatTerminer = document.getElementById("changerEtatTerminer");
    const changerEtatEnArchiver = document.getElementById("changerEtatEnArchiver");
    const infoCargoArchiver = document.getElementById("info-cargo-archiver");
    const volumeRestant = document.getElementById("volumeRestant");
    const montantTotal = document.getElementById("montantTotal");
    const etatVolume = document.getElementById("etatVolume");
    const etatGlobal = document.getElementById("etatGlobal");
    const etatAvancement = document.getElementById("etatAvancement");
    const ligneproduit2 = document.getElementById("ligneproduit2");
    const addligneproduit = document.getElementById("addligneproduit");
    const contentLignproduit = document.getElementById("content-lignproduit");
    let nbrLignProduit = 1;
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
    // console.log(currentCargaisonCode)
    let currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
    let currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
    // const numeroCargaisonEl = document.getElementById("numeroCargaison") as HTMLInputElement;
    /** Function Declaration **/
    const templateLigneProduit = () => {
        ++nbrLignProduit;
        return `
        <div class="relative w-full p-3 bg-gray-100 rounded-lg flex gap-x-3 flex-wrap flex-row items-center">
            <h4 class="text-xl font-bold mb-4 w-[100%]">Produit ${nbrLignProduit + 1}</h4>
            <button type="button" data-ligneproduitbutton="${nbrLignProduit}" id="ligneproduit" class="absolute text-2xl right-0 top-0 text-white hover:bg-gray-700 btn btn-circle bg-gray-800">X</button>
            <div class="content mb-4 flex-1">
                <label for="libelle" class="block text-gray-700 mb-2">libelle:</label>
                <input type="text" id="libelle" name="produit[${nbrLignProduit}][libelle]" class="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>
            </div>
            <div class="content mb-4 flex-1">
                <label for="poids" class="block text-gray-700 mb-2">Poids:</label>
                <input type="text" id="poids" name="produit[${nbrLignProduit}][poids]" class="w-full poidsToMontant bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>
            </div>
            <div data-ligneproduit="1" class="content mb-4 flex-1">
                <label for="typep" class="block text-gray-700">Type De produit</label>
                <select id="typep" name="produit[${nbrLignProduit}][typep]" class="typeProduitContent typeToMontant filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Sélectionner un type</option>
                    <option value="chimique">Chimique</option>
                    <option value="alimentaire">Alimentaire</option>
                    <option value="fragile">Fragile</option>
                    <option value="incassable">Incassable</option>
                </select>
                <span class="error-message text-[0.8rem]">error</span>
            </div>
            <div id="contentToxique" class="content mb-4 flex-1">

            </div>
        </div>
        `;
    };
    const buildLigneProduit = () => {
        contentLignproduit.insertAdjacentHTML("afterbegin", templateLigneProduit());
    };
    const onChangeTypeProduit = () => {
        const typepAll = document.querySelectorAll("select[id='typep']");
        typepAll.forEach((select) => {
            select.addEventListener("change", (event) => {
                const parent = select.parentNode;
                // console.log(parent)
                const voisinSuivant = select.parentNode.nextSibling.nextElementSibling;
                // console.log()
                if (select.value == "chimique") {
                    voisinSuivant.innerHTML = templateToxicite(parseInt(parent.dataset.ligneproduit));
                }
                else {
                    voisinSuivant.innerHTML = ``;
                }
            });
        });
    };
    // const onChangePoidsProduit = () => {
    //     const poidsToMontant = document.querySelectorAll("poidsToMontant") as NodeListOf<HTMLInputElement>;
    //     const typeToMontant = document.querySelectorAll("typeToMontant") as NodeListOf<HTMLInputElement>;
    //
    //     const montantColi = document.getElementById("montantColi") as HTMLSpanElement;
    //
    //     poidsToMontant.forEach(poidsInput => {
    //         let type = poidsInput.nextElementSibling as HTMLInputElement;
    //         poidsInput.addEventListener("input", () => {
    //             if(poidsInput.value.trim() && type.value.trim()){
    //
    //             }
    //         })
    //     })
    //
    // }
    function generateRandomCode(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '#';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }
    const typeProduitInitOptions = () => {
        const typeProduitContent = document.querySelectorAll(".typeProduitContent");
        typeProduitContent.forEach(select => {
            if (currentCargaison.getTypec() == "maritime") {
                select.innerHTML = `
                <option value="">Sélectionner un type</option>
                <option value="chimique">Chimique</option>
                <option value="alimentaire">Alimentaire</option>
                <option value="fragile">Fragile</option>
                <option value="incassable">Incassable</option>
                `;
            }
            else {
                select.innerHTML = `
                <option value="">Sélectionner un type</option>
                <option value="alimentaire">Alimentaire</option>
                <option value="fragile">Fragile</option>
                <option value="incassable">Incassable</option>
                `;
            }
        });
    };
    const disableFormAddProduit = () => {
        const form = document.getElementById('formColis');
        const elements = form.querySelectorAll('input[type="text"], button, select');
        elements.forEach(element => {
            element.disabled = true;
        });
    };
    const enableFormAddProduit = () => {
        const form = document.getElementById('formColis');
        const elements = form.querySelectorAll('input, button, select');
        elements.forEach(element => {
            element.disabled = false;
        });
    };
    const initDetailCargoButton = (currentICargaison) => {
        changerEtatOuvert.setAttribute("data-numeroCargo", currentICargaison.numero);
        changerEtatFermer.setAttribute("data-numeroCargo", currentICargaison.numero);
        changerEtatEnAttente.setAttribute("data-numeroCargo", currentICargaison.numero);
        changerEtatPerdue.setAttribute("data-numeroCargo", currentICargaison.numero);
        changerEtatEnCours.setAttribute("data-numeroCargo", currentICargaison.numero);
        changerEtatTerminer.setAttribute("data-numeroCargo", currentICargaison.numero);
        changerEtatEnArchiver.setAttribute("data-numeroCargo", currentICargaison.numero);
        if (currentICargaison.etatGlobal == "OUVERT") {
            changerEtatOuvert.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatFermer.classList.remove("opacity-50", "cursor-not-allowed");
            // console.log(dbQuery.isCargoFull(currentCargaisonCode))
            if (dbQuery.isCargoFull(currentCargaisonCode)) {
                disableFormAddProduit();
            }
            else {
                enableFormAddProduit();
            }
        }
        else {
            disableFormAddProduit();
            if (currentICargaison.etatAvancement == "EN ATTENTE") {
                changerEtatOuvert.classList.remove("opacity-50", "cursor-not-allowed");
                changerEtatFermer.classList.add("opacity-50", "cursor-not-allowed");
            }
            else if (currentICargaison.etatAvancement == "EN COURS" || currentICargaison.etatAvancement == "PERDUE") {
                changerEtatOuvert.classList.add("opacity-50", "cursor-not-allowed");
                changerEtatFermer.classList.add("opacity-50", "cursor-not-allowed");
            }
        }
        if (currentICargaison.etatGlobal == "OUVERT") {
            changerEtatEnAttente.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50", "cursor-not-allowed");
        }
        else if (currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "EN ATTENTE") {
            changerEtatEnAttente.classList.add("opacity-50", "cursor-not-allowed");
            if (dbQuery.comptVolumeContentCargo(currentCargaisonCode) == 0) {
                changerEtatEnCours.classList.add("opacity-50", "cursor-not-allowed");
            }
            else {
                changerEtatEnCours.classList.remove("opacity-50", "cursor-not-allowed");
            }
            changerEtatPerdue.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50", "cursor-not-allowed");
            disableFormAddProduit();
        }
        else if (currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "EN COURS") {
            changerEtatEnAttente.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatPerdue.classList.remove("opacity-50", "cursor-not-allowed");
            changerEtatTerminer.classList.remove("opacity-50", "cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50", "cursor-not-allowed");
            disableFormAddProduit();
        }
        else if (currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "PERDUE") {
            changerEtatEnAttente.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50", "cursor-not-allowed");
            disableFormAddProduit();
        }
        else if (currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "TERMINER") {
            changerEtatEnAttente.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatEnArchiver.classList.remove("hidden");
            disableFormAddProduit();
        }
        else if (currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "ARCHIVER") {
            changerEtatEnAttente.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50", "cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50", "cursor-not-allowed");
            infoCargoArchiver.classList.remove("hidden");
            disableFormAddProduit();
        }
    };
    const calculVolumeRestant = (currentICargaison) => {
        if (currentICargaison.nbrProduitMax > 0) {
            return currentICargaison.nbrProduitMax - dbQuery.comptVolumeContentCargo(currentCargaisonCode);
        }
        else {
            return parseInt("" + currentICargaison.poidsMax) - dbQuery.comptVolumeContentCargo(currentCargaisonCode);
        }
    };
    const showPleineOuPas = (currentICargaison) => {
        if (dbQuery.comptVolumeContentCargo(currentCargaisonCode) == currentICargaison.nbrProduitMax && currentICargaison.nbrProduitMax > 0) {
            return "Pleine";
        }
        else if (dbQuery.comptVolumeContentCargo(currentCargaisonCode) == parseInt("" + currentICargaison.poidsMax) && parseInt("" + currentICargaison.poidsMax) > 0) {
            return "Pleine";
        }
        else {
            return "Pas Pleine";
        }
    };
    const initialiserHeader = (currentICargaison) => {
        volumeRestant.innerHTML = currentICargaison.nbrProduitMax > 0
            ? calculVolumeRestant(currentICargaison) + " /produits restant"
            : calculVolumeRestant(currentICargaison) + " /Kg restant ";
        montantTotal.innerHTML = dbQuery.getCargoMontant(currentCargaisonCode) + " Fcfa";
        etatVolume.innerHTML = showPleineOuPas(currentICargaison);
        etatGlobal.innerHTML = currentICargaison.etatGlobal;
        etatAvancement.innerHTML = currentICargaison.etatAvancement;
    };
    const onDataLigneproduits = () => {
        const dataLigneproduits = document.querySelectorAll("[data-ligneproduitbutton]");
        dataLigneproduits.forEach((dtL) => {
            dtL.addEventListener("click", (event) => {
                dtL.parentElement.remove();
                if (nbrLignProduit >= 1) {
                    nbrLignProduit = nbrLignProduit - 1;
                }
            });
        });
    };
    /** Initialisation **/
    // headText.innerHTML = "Ajouter un produit dans la cargaison";
    // numeroCargaisonEl.value = currentCargaisonCode;
    initialiserHeader(currentICargaison);
    headInfoCargo.innerHTML = "Une cargaison " + currentICargaison.typec;
    volumeInfoCargo.innerHTML = "Volume: " + (currentICargaison.poidsMax > 0 ? currentICargaison.poidsMax + "Kg au Maximum" : (currentICargaison.nbrProduitMax + " produits au Maximum"));
    descInfoCargo.innerHTML = "Cette cargaison quitte " + currentICargaison.lieuDepart + " pour " + currentICargaison.lieuArrive;
    dateDepartInfoCargo.innerHTML = "Départ: " + currentICargaison.dateDepart;
    dateArriveInfoCargo.innerHTML = "Arrivée: " + currentICargaison.dateArrive;
    initDetailCargoButton(currentICargaison);
    onChangeTypeProduit();
    typeProduitInitOptions();
    onDataLigneproduits();
    /** Event Declaration **/
    produitFormHandler.handleSubmit(async (data) => {
        const formData = data;
        // console.log(formData);
        const codeColi = generateRandomCode(7);
        const codeProduit = generateRandomCode(9);
        let coli = {
            code: codeColi,
            produits: formData.produit.map(p => {
                p.code = generateRandomCode(9);
                p.cargaison = currentICargaison.numero;
                p.status = "EN ATTENTE";
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
        if (dbQuery.isCargaisonOpened(currentICargaison.numero) && dbQuery.isCargaisonEnAttente(currentICargaison.numero)
            && !dbQuery.isCargoFull(currentICargaison.numero)) {
            const volumeContent = dbQuery.comptVolumeContentCargo(currentICargaison.numero);
            if (currentCargaison.getPoidsMax() > 0) {
                let sommePoidsProduit = 0;
                coli.produits.forEach((p) => {
                    sommePoidsProduit += parseInt("" + p.poids);
                });
                if ((sommePoidsProduit + volumeContent) <= currentCargaison.getPoidsMax()) {
                    alertSuccess.classList.remove("hidden");
                    alertDanger.classList.add("hidden");
                    DB = await dbQuery.addProduitToCargaison(currentCargaisonCode, coli);
                    dbQuery.setDB(DB);
                    const result = await dao.postDataOther(data = { ...coli, ...{ formulaires: "ajout_produits" } });
                    console.log(result);
                    if (dbQuery.isCargoFull(currentICargaison.numero)) {
                        disableFormAddProduit();
                    }
                    initialiserHeader(currentICargaison);
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
                    dbQuery.setDB(DB);
                    const result = await dao.postDataOther(data = { ...coli, ...{ formulaires: "ajout_produits" } });
                    console.log(result);
                    if (dbQuery.isCargoFull(currentICargaison.numero)) {
                        disableFormAddProduit();
                    }
                    initialiserHeader(currentICargaison);
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
    telExpediteur.addEventListener("input", (event) => {
        if (telExpediteur.value.length >= 6) {
            const clientExpediteur = dbQuery.findClientByTel(telExpediteur.value);
            if (clientExpediteur) {
                document.getElementById("prenomExpediteur").value = clientExpediteur.getPrenom();
                document.getElementById("nomExpediteur").value = clientExpediteur.getNom();
                document.getElementById("villeExpediteur").value = clientExpediteur.getVille();
                document.getElementById("paysExpediteur").value = clientExpediteur.getPays();
                document.getElementById("emailExpediteur").value = clientExpediteur.getEmail();
            }
        }
    });
    telRecepteur.addEventListener("input", (event) => {
    });
    // ligneproduit2.addEventListener("click", (event: Event) => {
    //     (ligneproduit2.parentElement as HTMLDivElement).remove();
    //     nbrLignProduit = nbrLignProduit - 1;
    // })
    addligneproduit.addEventListener("click", (event) => {
        buildLigneProduit();
        onDataLigneproduits();
        typeProduitInitOptions();
        onChangeTypeProduit();
    });
    changerEtatFermer.addEventListener("click", async (event) => {
        DB = await dbQuery.changerEtaGlobalCargo(changerEtatFermer.dataset.numerocargo, "FERMER");
        dbQuery.setDB(DB);
        changerEtatOuvert.classList.remove("opacity-50", "cursor-not-allowed");
        changerEtatFermer.classList.add("opacity-50", "cursor-not-allowed");
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    });
    changerEtatOuvert.addEventListener("click", async (event) => {
        DB = await dbQuery.changerEtaGlobalCargo(changerEtatFermer.dataset.numerocargo, "OUVERT");
        dbQuery.setDB(DB);
        changerEtatOuvert.classList.add("opacity-50", "cursor-not-allowed");
        changerEtatFermer.classList.remove("opacity-50", "cursor-not-allowed");
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    });
    changerEtatEnAttente.addEventListener("click", async (event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatEnAttente.dataset.numerocargo, "EN ATTENTE");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    });
    changerEtatPerdue.addEventListener("click", async (event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatPerdue.dataset.numerocargo, "PERDUE");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    });
    changerEtatEnCours.addEventListener("click", async (event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatEnCours.dataset.numerocargo, "EN COURS");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    });
    changerEtatTerminer.addEventListener("click", async (event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatTerminer.dataset.numerocargo, "TERMINER");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
        // console.log(currentICargaison);
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.remove("hidden");
    });
    changerEtatEnArchiver.addEventListener("click", async (event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatEnArchiver.dataset.numerocargo, "ARCHIVER");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode);
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
        infoCargoArchiver.classList.remove("hidden");
    });
})();
