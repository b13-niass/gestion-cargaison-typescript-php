import {DAO} from "./Model/DAO.js";
import {
    DBStructure,
    ICargaison,
    IClientStructures,
    IColi,
    IProduit,
    loginInformation
} from "./Interface/DataBinding.js";
import {DbQuery} from "./Model/DbQuery.js";
import {Cargaison} from "./Model/Cargaison.js";
import {ProduitFormHandler} from "./Model/ProduitFormHandler.js";
import {Client} from "./Model/Client.js";
import {Produit} from "./Model/Produit.js";

interface infoProduit {
    libelle: string;
    poids: number;
    typep: string;
    code?: string;
    cargaison?: string,
    status?: string
}
interface infoAllAddProduit{
    emailExpediteur: string;
    emailRecepteur: string;
    nomExpediteur: string;
    nomRecepteur: string;
    paysExpediteur: string;
    paysRecepteur: string;
    prenomExpediteur: string;
    prenomRecepteur: string;
    produit: infoProduit[];
    telExpediteur: string;
    telRecepteur: string;
    villeExpediteur: string;
    villeRecepteur: string;
}

(async () => {
    /** Variable Declaration **/

    const logoutEl = document.getElementById("logout") as HTMLLinkElement;
    const gestionaireName = document.getElementById("gestionaire-name") as HTMLLinkElement;
    const gestionnaire: loginInformation = JSON.parse(sessionStorage.getItem('ges')!);

    gestionaireName.innerText = gestionnaire.nom!;

    logoutEl.addEventListener("click", (event: Event) => {
        sessionStorage.removeItem('ges');
        location.href = '/login';
    })

    // const headText : HTMLDivElement = document.getElementById("head-text") as HTMLDivElement;
    const headerBar : HTMLHeadElement = document.getElementById("header-bar") as HTMLHeadElement;

    const dao = new DAO();
    let DB: DBStructure = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const produitFormHandler: ProduitFormHandler = new ProduitFormHandler("#formColis");

    let currentCargaisonCode: string;
    let nombreDeLigneDeProduit: number = 2;
    const alertSuccess = document.getElementById("alertSuccess") as HTMLDivElement;
    const alertDanger = document.getElementById("alertDanger") as HTMLDivElement;
    const typeProduitContent = document.querySelectorAll(".typeProduitContent") as NodeListOf<HTMLSelectElement>;
    const telExpediteur = document.getElementById("telExpediteur") as HTMLInputElement;
    const telRecepteur = document.getElementById("telRecepteur") as HTMLInputElement;

    const headInfoCargo = document.getElementById("headInfoCargo") as HTMLDivElement;
    const volumeInfoCargo = document.getElementById("volumeInfoCargo") as HTMLDivElement;
    const descInfoCargo = document.getElementById("descInfoCargo") as HTMLDivElement;
    // const montantInfoCargo = document.getElementById("montantInfoCargo") as HTMLDivElement;
    const dateDepartInfoCargo = document.getElementById("dateDepartInfoCargo") as HTMLDivElement;
    const dateArriveInfoCargo = document.getElementById("dateArriveInfoCargo") as HTMLDivElement;
    const changerEtatOuvert = document.getElementById("changerEtatOuvert") as HTMLButtonElement;
    const changerEtatFermer = document.getElementById("changerEtatFermer") as HTMLButtonElement;
    const changerEtatEnAttente = document.getElementById("changerEtatEnAttente") as HTMLButtonElement;
    const changerEtatPerdue = document.getElementById("changerEtatPerdue") as HTMLButtonElement;
    const changerEtatEnCours = document.getElementById("changerEtatEnCours") as HTMLButtonElement;
    const changerEtatTerminer = document.getElementById("changerEtatTerminer") as HTMLButtonElement;
    const changerEtatEnArchiver = document.getElementById("changerEtatEnArchiver") as HTMLButtonElement;
    const infoCargoArchiver = document.getElementById("info-cargo-archiver") as HTMLButtonElement;

    const volumeRestant = document.getElementById("volumeRestant") as HTMLPreElement;
    const montantTotal = document.getElementById("montantTotal") as HTMLPreElement;
    const etatVolume = document.getElementById("etatVolume") as HTMLPreElement;
    const etatGlobal = document.getElementById("etatGlobal") as HTMLPreElement;
    const etatAvancement = document.getElementById("etatAvancement") as HTMLPreElement;
    const ligneproduit2 = document.getElementById("ligneproduit2") as HTMLDivElement;
    const addligneproduit = document.getElementById("addligneproduit") as HTMLDivElement;

    const contentLignproduit = document.getElementById("content-lignproduit") as HTMLDivElement;

    let nbrLignProduit = 1;

    const templateToxicite = (numero: number) => {
        return `<label for="toxicite" class="block text-gray-700 mb-2">Toxicite:</label>
                <input type="text" id="toxicite" name="produit[${numero}][toxicite]" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>`;
    }
    if (localStorage.getItem("detailcargo")){
        currentCargaisonCode = localStorage.getItem("detailcargo")!;
        // localStorage.removeItem("detailcargo");
    }else {
        window.location.href = "/cargo";
        return;
    }
    // console.log(currentCargaisonCode)
    let currentCargaison: Cargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
    let currentICargaison: ICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;

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
                <input type="text" id="poids" name="produit[${nbrLignProduit}][poids]" class="w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                <span class="error-message text-[0.8rem]">error</span>
            </div>
            <div data-ligneproduit="1" class="content mb-4 flex-1">
                <label for="typep" class="block text-gray-700">Type De produit</label>
                <select id="typep" name="produit[${nbrLignProduit}][typep]" class="typeProduitContent filter-bar mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
    }

    const buildLigneProduit = () => {
        contentLignproduit.insertAdjacentHTML("afterbegin", templateLigneProduit());
    }

    const onChangeTypeProduit = () => {
        const typepAll = document.querySelectorAll("select[id='typep']") as NodeListOf<HTMLSelectElement>;
        typepAll.forEach((select) => {
            select.addEventListener("change", (event: Event) => {
                const parent = select.parentNode! as HTMLDivElement;
                // console.log(parent)
                const voisinSuivant = (select.parentNode!.nextSibling as HTMLDivElement).nextElementSibling as HTMLDivElement;
                // console.log()
                if (select.value == "chimique") {
                    voisinSuivant.innerHTML = templateToxicite(parseInt(parent.dataset.ligneproduit!));
                }else {
                    voisinSuivant.innerHTML = ``;
                }
            })
        })
    }

    function generateRandomCode(length: number) : string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '#';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    }

    const typeProduitInitOptions = () => {
        const typeProduitContent = document.querySelectorAll(".typeProduitContent") as NodeListOf<HTMLSelectElement>;
        typeProduitContent.forEach(select => {
            if (currentCargaison.getTypec() == "maritime"){
                select.innerHTML = `
                <option value="">Sélectionner un type</option>
                <option value="chimique">Chimique</option>
                <option value="alimentaire">Alimentaire</option>
                <option value="fragile">Fragile</option>
                <option value="incassable">Incassable</option>
                `;
            }else {
                select.innerHTML = `
                <option value="">Sélectionner un type</option>
                <option value="alimentaire">Alimentaire</option>
                <option value="fragile">Fragile</option>
                <option value="incassable">Incassable</option>
                `;
            }
        })
    }

    const disableFormAddProduit = () => {
        const form = document.getElementById('formColis') as HTMLFormElement;
        const elements = form.querySelectorAll('input[type="text"], button, select') as NodeListOf<HTMLInputElement>;
        elements.forEach(element => {
            element.disabled = true;
        });
    }

    const enableFormAddProduit = () => {
        const form = document.getElementById('formColis') as HTMLFormElement;
        const elements = form.querySelectorAll('input, button, select') as NodeListOf<HTMLInputElement>;

        elements.forEach(element => {
            element.disabled = false;
        });
    }

    const initDetailCargoButton = (currentICargaison: ICargaison) => {
        changerEtatOuvert.setAttribute("data-numeroCargo", currentICargaison.numero!);
        changerEtatFermer.setAttribute("data-numeroCargo", currentICargaison.numero!);
        changerEtatEnAttente.setAttribute("data-numeroCargo", currentICargaison.numero!);
        changerEtatPerdue.setAttribute("data-numeroCargo", currentICargaison.numero!);
        changerEtatEnCours.setAttribute("data-numeroCargo", currentICargaison.numero!);
        changerEtatTerminer.setAttribute("data-numeroCargo", currentICargaison.numero!);
        changerEtatEnArchiver.setAttribute("data-numeroCargo", currentICargaison.numero!);

        if (currentICargaison.etatGlobal == "OUVERT"){
            changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatFermer.classList.remove("opacity-50" ,"cursor-not-allowed");
            // console.log(dbQuery.isCargoFull(currentCargaisonCode))
            if (dbQuery.isCargoFull(currentCargaisonCode)){
                disableFormAddProduit();
            }else {
                enableFormAddProduit();
            }
        }else {
            disableFormAddProduit();
            if (currentICargaison.etatAvancement == "EN ATTENTE"){
                changerEtatOuvert.classList.remove("opacity-50" ,"cursor-not-allowed");
                changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
            }else if(currentICargaison.etatAvancement == "EN COURS" || currentICargaison.etatAvancement == "PERDUE") {
                changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
                changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
            }
        }

        if (currentICargaison.etatGlobal == "OUVERT"){
            changerEtatEnAttente.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50" ,"cursor-not-allowed");
        }else if(currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "EN ATTENTE"){
            changerEtatEnAttente.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatEnCours.classList.remove("opacity-50" ,"cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50" ,"cursor-not-allowed");
            disableFormAddProduit();
        }else if(currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "EN COURS"){
            changerEtatEnAttente.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatPerdue.classList.remove("opacity-50" ,"cursor-not-allowed");
            changerEtatTerminer.classList.remove("opacity-50" ,"cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
            disableFormAddProduit();
        }else if(currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "PERDUE"){
            changerEtatEnAttente.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
            disableFormAddProduit();
        }else if(currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "TERMINER"){
            changerEtatEnAttente.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatEnArchiver.classList.remove("hidden");
            disableFormAddProduit();
        }else if(currentICargaison.etatGlobal == "FERMER" && currentICargaison.etatAvancement == "ARCHIVER"){
            changerEtatEnAttente.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatEnCours.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatPerdue.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatTerminer.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
            changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
            infoCargoArchiver.classList.remove("hidden");
            disableFormAddProduit();
        }
    }

    const calculVolumeRestant = (currentICargaison: ICargaison): number =>{
        if (currentICargaison.nbrProduitMax! > 0){
            return currentICargaison.nbrProduitMax! - dbQuery.comptVolumeContentCargo(currentCargaisonCode);
        }else {
            return parseInt(""+currentICargaison.poidsMax!) - dbQuery.comptVolumeContentCargo(currentCargaisonCode);
        }
    }
    const showPleineOuPas = (currentICargaison: ICargaison):string => {
     if (dbQuery.comptVolumeContentCargo(currentCargaisonCode) == currentICargaison.nbrProduitMax && currentICargaison.nbrProduitMax > 0)
     {
         return "Pleine";
     }else if (dbQuery.comptVolumeContentCargo(currentCargaisonCode) == parseInt(""+currentICargaison.poidsMax) && parseInt(""+currentICargaison.poidsMax) > 0){
         return "Pleine";
     }else {
         return "Pas Pleine";
     }
    }
    const initialiserHeader = (currentICargaison: ICargaison) => {
        volumeRestant.innerHTML = currentICargaison.nbrProduitMax! > 0
            ? calculVolumeRestant(currentICargaison) + " /produits restant"
            : calculVolumeRestant(currentICargaison)  + " /Kg restant ";
        montantTotal.innerHTML = dbQuery.getCargoMontant(currentCargaisonCode)+" Fcfa"
        etatVolume.innerHTML = showPleineOuPas(currentICargaison);
        etatGlobal.innerHTML = currentICargaison.etatGlobal!;
        etatAvancement.innerHTML = currentICargaison.etatAvancement!;
    }
    const onDataLigneproduits = () => {
        const dataLigneproduits = document.querySelectorAll("[data-ligneproduitbutton]") as NodeListOf<HTMLButtonElement>;

        dataLigneproduits.forEach((dtL: HTMLButtonElement) => {
            dtL.addEventListener("click", (event: Event) => {
                (dtL.parentElement as HTMLDivElement).remove();
                if (nbrLignProduit >= 1 ){
                    nbrLignProduit = nbrLignProduit - 1;
                }
            })
        })
    }
    /** Initialisation **/
    // headText.innerHTML = "Ajouter un produit dans la cargaison";
    // numeroCargaisonEl.value = currentCargaisonCode;

    initialiserHeader(currentICargaison);
    headInfoCargo.innerHTML = "Une cargaison "+ currentICargaison.typec!;
    volumeInfoCargo.innerHTML = "Volume: "+ (currentICargaison.poidsMax! > 0? currentICargaison.poidsMax+"Kg au Maximum": (currentICargaison.nbrProduitMax + " produits au Maximum") );
    descInfoCargo.innerHTML = "Cette cargaison quitte " + currentICargaison.lieuDepart + " pour " + currentICargaison.lieuArrive;
    dateDepartInfoCargo.innerHTML = "Départ: "+ currentICargaison.dateDepart;
    dateArriveInfoCargo.innerHTML = "Arrivée: "+ currentICargaison.dateArrive;
    initDetailCargoButton(currentICargaison);
    onChangeTypeProduit();
    typeProduitInitOptions();
    onDataLigneproduits()

    /** Event Declaration **/
    produitFormHandler.handleSubmit(async (data) => {
        const formData: infoAllAddProduit = data as infoAllAddProduit;
        // console.log(formData);
        const codeColi: string = generateRandomCode(7);
        const codeProduit: string = generateRandomCode(9);
        let coli: IColi = {
            code: codeColi,
            produits: formData.produit.map(p => {
                p.code = generateRandomCode(9);
                p.cargaison = currentICargaison.numero!;
                p.status = "EN ATTENTE";
                return p
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
        }
        if (dbQuery.isCargaisonOpened(currentICargaison.numero!) && dbQuery.isCargaisonEnAttente(currentICargaison.numero!)
            && !dbQuery.isCargoFull(currentICargaison.numero!)) {
            const volumeContent: number = dbQuery.comptVolumeContentCargo(currentICargaison.numero!);
            // console.log("VolumeActuContenu: "+volumeContent)
            // console.log("VolumeActu: "+currentCargaison.getPoidsMax())
            if (currentCargaison.getPoidsMax() > 0) {
                let sommePoidsProduit: number = 0;
                coli.produits!.forEach((p) => {
                    sommePoidsProduit += parseInt(""+p.poids!);
                })
                // console.log("sommePoidsProduit: "+ sommePoidsProduit )
                // console.log("volumeContent: "+ volumeContent)
                // console.log("Somme volume: "+ (sommePoidsProduit + volumeContent))
                if ((sommePoidsProduit + volumeContent) <= currentCargaison.getPoidsMax()) {
                    alertSuccess.classList.remove("hidden");
                    alertDanger.classList.add("hidden");
                    DB = await dbQuery.addProduitToCargaison(currentCargaisonCode, coli);
                    dbQuery.setDB(DB);
                    // console.log({...coli, ...{formulaires: "ajout_produits"}})
                    await dao.postDataGenPDF(data = {...coli, ...{formulaires: "ajout_produits"}})
                        .then(blob => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'generated.pdf';
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            window.URL.revokeObjectURL(url);
                            // console.log(blob)
                        });
                    if (dbQuery.isCargoFull(currentICargaison.numero!)){
                        disableFormAddProduit();
                    }
                    initialiserHeader(currentICargaison);
                    produitFormHandler.resetForm();
                } else {
                    alertSuccess.classList.add("hidden");
                    alertDanger.classList.remove("hidden");
                }

            } else {
                let cpt: number = coli.produits!.length;
                if ((cpt + volumeContent) <= currentCargaison.getNbrProduitMax()) {
                    alertSuccess.classList.remove("hidden");
                    alertDanger.classList.add("hidden");
                    DB = await dbQuery.addProduitToCargaison(currentCargaisonCode, coli);
                    dbQuery.setDB(DB);
                    // console.log({...coli, ...{formulaires: "ajout_produits"}})
                    await dao.postDataGenPDF(data = {...coli, ...{formulaires: "ajout_produits"}})
                        .then(blob => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'generated.pdf';
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            window.URL.revokeObjectURL(url);
                        });

                    // console.log(result);
                    if (dbQuery.isCargoFull(currentICargaison.numero!)){
                        disableFormAddProduit();
                    }
                    initialiserHeader(currentICargaison);
                    produitFormHandler.resetForm();
                } else {
                    alertSuccess.classList.add("hidden");
                    alertDanger.classList.remove("hidden");
                }
            }
        }else {
            alertSuccess.classList.add("hidden");
            alertDanger.classList.remove("hidden");
        }
    })

    telExpediteur.addEventListener("input", (event: Event)=>{
        if (telExpediteur.value.length >= 6){
            const clientExpediteur: Client|undefined = dbQuery.findClientByTel(telExpediteur.value);
            if (clientExpediteur){
                (document.getElementById("prenomExpediteur") as HTMLInputElement).value = clientExpediteur.getPrenom();
                (document.getElementById("nomExpediteur") as HTMLInputElement).value = clientExpediteur.getNom();
                (document.getElementById("villeExpediteur") as HTMLInputElement).value = clientExpediteur.getVille();
                (document.getElementById("paysExpediteur") as HTMLInputElement).value = clientExpediteur.getPays();
                (document.getElementById("emailExpediteur") as HTMLInputElement).value = clientExpediteur.getEmail();
            }
        }
    })

    telRecepteur.addEventListener("input", (event: Event)=>{

    })

    // ligneproduit2.addEventListener("click", (event: Event) => {
    //     (ligneproduit2.parentElement as HTMLDivElement).remove();
    //     nbrLignProduit = nbrLignProduit - 1;
    // })

    addligneproduit.addEventListener("click", (event: Event)=> {
        buildLigneProduit();
        onDataLigneproduits();
        typeProduitInitOptions();
        onChangeTypeProduit();
    })

    changerEtatFermer.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtaGlobalCargo(changerEtatFermer.dataset.numerocargo!, "FERMER");
        dbQuery.setDB(DB);
        changerEtatOuvert.classList.remove("opacity-50" ,"cursor-not-allowed");
        changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    })
    changerEtatOuvert.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtaGlobalCargo(changerEtatFermer.dataset.numerocargo!, "OUVERT");
        dbQuery.setDB(DB);
        changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
        changerEtatFermer.classList.remove("opacity-50" ,"cursor-not-allowed");
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    })
    changerEtatEnAttente.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatEnAttente.dataset.numerocargo!, "EN ATTENTE");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    })
    changerEtatPerdue.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatPerdue.dataset.numerocargo!, "PERDUE");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    })
    changerEtatEnCours.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatEnCours.dataset.numerocargo!, "EN COURS");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;
        // console.log(currentICargaison)
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
    })
    changerEtatTerminer.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatTerminer.dataset.numerocargo!, "TERMINER");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;
        // console.log(currentICargaison);
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.remove("hidden");
    })

    changerEtatEnArchiver.addEventListener("click", async (event: Event) => {
        DB = await dbQuery.changerEtatAvancementCargo(changerEtatEnArchiver.dataset.numerocargo!, "ARCHIVER");
        dbQuery.setDB(DB);
        currentCargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
        currentICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == currentCargaisonCode)!;
        initDetailCargoButton(currentICargaison);
        initialiserHeader(currentICargaison);
        changerEtatEnArchiver.classList.add("hidden");
        infoCargoArchiver.classList.remove("hidden");
    })

})()