import {DAO} from "./Model/DAO.js";
import {DBStructure, IClientStructures, IColi, IProduit} from "./Interface/DataBinding.js";
import {DbQuery} from "./Model/DbQuery.js";
import {Cargaison} from "./Model/Cargaison.js";
import {ProduitFormHandler} from "./Model/ProduitFormHandler.js";

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
    const headText : HTMLDivElement = document.getElementById("head-text") as HTMLDivElement;
    const dao = new DAO();
    let DB: DBStructure = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const produitFormHandler: ProduitFormHandler = new ProduitFormHandler("#formColis");

    let currentCargaisonCode: string;
    let nombreDeLigneDeProduit: number = 2;
    const alertSuccess = document.getElementById("alertSuccess") as HTMLDivElement;
    const alertDanger = document.getElementById("alertDanger") as HTMLDivElement;

    // console.log(dbQuery.findCargoByColi("#YX2213"));
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

    const currentCargaison: Cargaison = dbQuery.findInAllByNumero(currentCargaisonCode);
    // const numeroCargaisonEl = document.getElementById("numeroCargaison") as HTMLInputElement;

    /** Function Declaration **/
    const onChangeTypeProduit = () => {
        const typepAll = document.querySelectorAll("select[id='typep']") as NodeListOf<HTMLSelectElement>;
        typepAll.forEach((select) => {
            select.addEventListener("change", (event: Event) => {
                const parent = select.parentNode! as HTMLDivElement;
                console.log(parent)
                const voisinSuivant = (select.parentNode!.nextSibling as HTMLDivElement).nextElementSibling as HTMLDivElement;
                console.log()
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
    /** Initialisation **/
    headText.innerHTML = "Ajouter un produit dans la cargaison";
    // numeroCargaisonEl.value = currentCargaisonCode;
    onChangeTypeProduit();

    /** Event Declaration **/
    produitFormHandler.handleSubmit(async (data) => {
        const formData: infoAllAddProduit = data as infoAllAddProduit;
        console.log(formData);
        const codeColi: string = generateRandomCode(7);
        const codeProduit: string = generateRandomCode(9);
        let coli: IColi = {
            code: codeColi,
            produits: formData.produit.map(p => {
                p.code = generateRandomCode(9);
                p.cargaison = currentCargaison.getNumeros();
                p.status = "en attente";
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
        if (dbQuery.isCargaisonOpened(currentCargaison.getNumeros()) && dbQuery.isCargaisonEnAttente(currentCargaison.getNumeros())
            && !dbQuery.isCargoFull(currentCargaison.getNumeros())) {
            const volumeContent: number = dbQuery.comptVolumeContentCargo(currentCargaison.getNumeros());
            if (currentCargaison.getPoidsMax() > 0) {
                let sommePoidsProduit: number = 0;
                coli.produits!.forEach((p) => {
                    sommePoidsProduit += p.poids!
                })
                if ((sommePoidsProduit + volumeContent) <= currentCargaison.getPoidsMax()) {
                    alertSuccess.classList.remove("hidden");
                    alertDanger.classList.add("hidden");
                    DB = await dbQuery.addProduitToCargaison(currentCargaisonCode, coli);
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


})()