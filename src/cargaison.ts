import {DAO} from "./Model/DAO.js";
import {DBStructure, ICargaison, ISubmitCargaison} from "./Interface/DataBinding.js";
import {DbQuery} from "./Model/DbQuery.js";
import {Cargaison} from "./Model/Cargaison.js";
import {Pagination} from "./Model/Pagination.js";
import {FormHandler} from "./Model/CargoFormHandler.js";
import {CargaisonBuilder} from "./Model/CargaisonBuilder.js";
import {Maritime} from "./Model/Maritime.js";
import {Routiere} from "./Model/Routiere.js";
import {Aerienne} from "./Model/Aerienne.js";
import {FormatDate} from "./Model/FormatDate.js";
(async () => {
    /** Variable Declaration **/
    // const headText : HTMLHeadElement = document.getElementById("head-text") as HTMLHeadElement;
    const headerBar : HTMLHeadElement = document.getElementById("header-bar") as HTMLHeadElement;
    const dao = new DAO();
    let DB: DBStructure = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const AddCargaisonForm  = document.getElementById("AddCargaisonForm") as HTMLFormElement;
    const listeCargaisonContent  = document.getElementById("listeCargaisonContent") as HTMLDivElement;
    const filterBars = document.querySelectorAll(".filter-bar") as NodeListOf<HTMLInputElement>;
    const mapContainer = document.getElementById("mapContainer") as HTMLDivElement;
    const myMapDialog = document.getElementById("my-map-dialog") as HTMLDivElement;
    const modalInfoCargo = document.getElementById("my_cargo_info") as HTMLDivElement;
    const showMyMap = document.getElementById("show-my-map") as HTMLDivElement;
    const btnCloseMap = document.querySelector(".btn-close-map") as HTMLButtonElement;
    const btnCloseInfo = document.querySelector(".btn-close-info") as HTMLButtonElement;
    const btnEnregistrer = document.getElementById("btnEnregistrer") as HTMLButtonElement;
    const formAddCargo = document.getElementById("formAddCargo") as HTMLButtonElement;
    const volumeChange = document.getElementById("volume") as HTMLSelectElement;
    const volumeContent = document.getElementById("volumeContent") as HTMLDivElement;
    const headInfoCargo = document.getElementById("headInfoCargo") as HTMLDivElement;
    const volumeInfoCargo = document.getElementById("volumeInfoCargo") as HTMLDivElement;
    const montantInfoCargo = document.getElementById("montantInfoCargo") as HTMLDivElement;
    const dateDepartInfoCargo = document.getElementById("dateDepartInfoCargo") as HTMLDivElement;
    const dateArriveInfoCargo = document.getElementById("dateArriveInfoCargo") as HTMLDivElement;
    const changerEtatOuvert = document.getElementById("changerEtatOuvert") as HTMLButtonElement;
    const changerEtatFermer = document.getElementById("changerEtatFermer") as HTMLButtonElement;


    const formAddCargoHandle = new FormHandler("#formAddCargo");

    let filterListeCargaison: Cargaison[] = [];
    let filterOptions:Record<string, any> = {};
    let infoSupp:Record<string, any> = {};
    let btnEnregistrerStatus = false;
    const paginationObject = new Pagination(filterListeCargaison, 3);

    /** Function Declaration **/
    const updateCagaisonTable = () => {
        const tbody = document.getElementById("listeCargaisonContent") as HTMLTableSectionElement;
        tbody.innerHTML = '';
        paginationObject.getPageItems().forEach((cargo, index) => {
            const tr = cargo.info();
            tbody.appendChild(tr);
        });
        paginationObject.makeFooter();
    }

    const onFilterBar = () => {
        filterBars.forEach((filterBar) => {
            filterBar.addEventListener("input", (event) =>{
                // Object.keys(filterOptions).some(key => key == filterBar.name)
                if (!filterBar.value){
                    delete filterOptions[filterBar.name];
                }else {
                    filterOptions[filterBar.name] = filterBar.value;
                }
                // console.log(filterOptions)
                filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
                paginationObject.setItems(filterListeCargaison);
                paginationObject.goToPage(1);
                updateCagaisonTable();
                onClickPaginationNav();
                onClickVoirPlus();
                onClickInfoCargaison();
            })
        })
    }

    const onClickPaginationNav = () => {
        const btnsPaginate = document.querySelectorAll("[data-paginate]") as NodeListOf<HTMLButtonElement>;
        btnsPaginate.forEach((btn) => {
            btn.addEventListener("click", (event: Event) => {
                paginationObject.goToPage(parseInt(btn.dataset.paginate!));
                updateCagaisonTable();
                onClickPaginationNav();
                onClickVoirPlus();
                onClickInfoCargaison();
            })
        })
    }

    function generateRandomCode(): string {
        // Function to generate a random number within a specified range
        function getRandomNumber(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Function to generate a random uppercase letter
        function getRandomLetter(): string {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return letters.charAt(getRandomNumber(0, letters.length - 1));
        }

        // Generate the random code with the specific pattern "#1123SXF12"
        let code = '#';
        // Add 4 random digits
        for (let i = 0; i < 4; i++) {
            code += getRandomNumber(0, 9).toString();
        }
        // Add 3 random uppercase letters
        for (let i = 0; i < 3; i++) {
            code += getRandomLetter();
        }
        // Add 2 random digits
        for (let i = 0; i < 2; i++) {
            code += getRandomNumber(0, 9).toString();
        }

        return code;
    }

    function convertMinutesToHours(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} h-${remainingMinutes}min`;
    }

    function addMinutesToDate(dateString: string, minutes: number): string {
        const date = new Date(dateString);

        date.setMinutes(date.getMinutes() + minutes);

        return date.toISOString();
    }

    function betweenTwoDate(dateDepart: string, dateArrive: string): number {
            const startDate = new Date(dateDepart);
            const endDate = new Date(dateArrive);
            const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
            const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
            return differenceInMinutes;
    }
    function getTodayDate(): string {
        const today = new Date();
        const year = today.getFullYear();

        const month = (today.getMonth() + 1).toString();
        const formattedMonth = month.length === 1 ? '0' + month : month;

        const day = today.getDate().toString();
        const formattedDay = day.length === 1 ? '0' + day : day;

        return `${year}-${formattedMonth}-${formattedDay}`;
    }

    const onClickVoirPlus = () => {
        const voirPlus: NodeListOf<HTMLLinkElement> = document.querySelectorAll("[data-detailcargo]");
        voirPlus.forEach(vp => {
            vp.addEventListener("click", (event: Event) => {
                localStorage.setItem("detailcargo", vp.dataset.detailcargo!);
                window.location.href = "/detcargo";
            })
        })
    }

    const onClickInfoCargaison = () => {
        const btnInfos: NodeListOf<HTMLLinkElement> = document.querySelectorAll("[data-detailcargoInfo]");
        btnInfos.forEach(btn => {
            btn.addEventListener("click", () => {
                modalInfoCargo.classList.add("modal-open");
                // console.log(btn.dataset.detailcargoinfo);
                // console.log(dbQuery.findAllProduitByCargo(btn.dataset.detailcargoinfo!))
                const cargaison: ICargaison = dbQuery.findAllTypeCargaisonInterfaces().find(c => c.numero == btn.dataset.detailcargoinfo)!;
                // console.log(cargaison)
                headInfoCargo.innerHTML = "Une cargaison "+ cargaison.typec!;
                volumeInfoCargo.innerHTML = "Volume: "+ (cargaison.poidsMax! > 0? cargaison.poidsMax+"Kg": cargaison.nbrProduitMax ) + " produits";
                // montantInfoCargo.innerHTML = "Montant: "+ dbQuery.getCargoMontant(cargaison.numero!);
                dateDepartInfoCargo.innerHTML = "Départ: "+ cargaison.dateDepart;
                dateArriveInfoCargo.innerHTML = "Arrivée: "+ cargaison.dateArrive;
                changerEtatOuvert.setAttribute("data-numeroCargo", cargaison.numero!);
                changerEtatFermer.setAttribute("data-numeroCargo", cargaison.numero!);
                if (cargaison.etatGlobal == "OUVERT"){
                    changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
                    changerEtatFermer.classList.remove("opacity-50" ,"cursor-not-allowed");
                }else {
                    changerEtatOuvert.classList.remove("opacity-50" ,"cursor-not-allowed");
                    changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
                }
            })
        })
    }

    /** Initialisation **/
    filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
    paginationObject.setItems(filterListeCargaison);
    paginationObject.makeFooter();
    // updateCagaisonTable();
    onFilterBar();
    onClickPaginationNav();
    onClickVoirPlus();
    onClickInfoCargaison();

    const dateDepartInit = document.getElementById("dateDepart") as HTMLInputElement;
    const dateArriveInit = document.getElementById("dateArrive") as HTMLInputElement;
    if (dateDepartInit) {
        dateDepartInit.min = getTodayDate();
    }
    if (dateArriveInit) {
        dateArriveInit.min = getTodayDate();
    }



    /** Event Declaration **/

    btnCloseInfo.addEventListener("click", (event: Event) => {
        modalInfoCargo.classList.remove("modal-open");
    })

    mapContainer.addEventListener("click", (event: Event) => {
        myMapDialog.classList.add("modal-open");
    })

    btnCloseMap.addEventListener("click", (event: Event) => {
        myMapDialog.classList.remove("modal-open");

        if (localStorage.getItem("infoSupp")){
            infoSupp = {...JSON.parse(localStorage.getItem("infoSupp")!) as Record<string, any>}
            if (Object.keys(infoSupp).length != 4){
                document.getElementById("mapContainer")?.classList.add("error");
            }else {
                const dateDepart = document.getElementById("dateDepart") as HTMLInputElement;
                const dateArrive = document.getElementById("dateArrive") as HTMLInputElement;
                const formatDate = new FormatDate();
                document.getElementById("result-table")?.classList.remove("invisible");
                (document.getElementById("distance") as HTMLTableCellElement).innerHTML = (parseInt(infoSupp.distance)/1000) +" Km";
                (document.getElementById("lieuDepart") as HTMLTableCellElement).innerHTML = infoSupp.cityName1;
                (document.getElementById("lieuArrive") as HTMLTableCellElement).innerHTML = infoSupp.cityName2;
                (document.getElementById("duree") as HTMLTableCellElement).innerHTML = convertMinutesToHours(betweenTwoDate(dateDepart.value, dateArrive.value))??0;
            }
        }else {
            document.getElementById("result-table")?.classList.add("invisible");
        }
    })

    formAddCargoHandle.handleSubmit(async (d: ISubmitCargaison) => {
        const formatDate = new FormatDate();
        let cargaison! : CargaisonBuilder<Cargaison>;
        if (d.typec == "maritime"){
            cargaison = new CargaisonBuilder<Maritime>(new Maritime())
        }else if (d.typec == "routiere"){
            cargaison = new CargaisonBuilder<Routiere>(new Routiere())
        }else if (d.typec == "aerienne"){
            cargaison = new CargaisonBuilder<Aerienne>(new Aerienne())
        }

        cargaison.withDuree(betweenTwoDate(d.dateDepart!, d.dateArrive!))
            .withPoidsMax(isNaN(parseInt(d.poidsMax!))?0:parseInt(d.poidsMax!))
            .withDistance(d.distance!/1000)
            .withEtatAvancement("EN ATTENTE")
            .withEtatGlobal("OUVERT")
            .withImage("https://placehold.co/500")
            .withNbrProduitMax(isNaN(parseInt(d.nbrProduitMax!))? 0 :parseInt(d.nbrProduitMax!))
            .withTypec(d.typec!)
            .withLieuDepart(d.cityName1!)
            .withLieuArrive(d.cityName2!)
            .withMontantTotal(1000)
            .withDateDepart(d.dateDepart!)
            .withDateArrive(d.dateArrive!)
            .withNumero(generateRandomCode());
        let data : ICargaison= {...cargaison.build()};
        dbQuery.setDB(await dbQuery.addCargaison(data));
        formAddCargoHandle.resetForm();
        infoSupp = {};
        document.getElementById("result-table")?.classList.add("invisible");

        filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
        paginationObject.setItems(filterListeCargaison);
        updateCagaisonTable();
        onFilterBar();
        onClickPaginationNav();
        onClickVoirPlus();
        onClickInfoCargaison();
    })

    volumeChange.addEventListener("change", (event: Event)=>{
        if (volumeChange.value == "poids"){
            volumeContent.innerHTML = `<label for="poidsMax" class="block text-sm font-medium text-gray-700">Poids</label>
                <input type="text" id="poidsMax" name="poidsMax" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">(kg)
                <span class="error-message">error</span>`;
        }else if(volumeChange.value == "nbrProduit"){
            volumeContent.innerHTML = `<label for="nbrProduitMax" class="block text-sm font-medium text-gray-700">Nbre de produits</label>
                <input type="text" id="nbrProduitMax" name="nbrProduitMax" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>`;
        }else {
            volumeContent.innerHTML = '';
        }
    })

    // const dateArrive = document.getElementById("dateArrive") as HTMLInputElement;
    // dateArrive.addEventListener("change", (e) => {
    //     const dateDepart = document.getElementById("dateDepart") as HTMLInputElement;
    //     console.log(betweenTwoDate(dateDepart.value, dateArrive.value));
    // })

    dateDepartInit.addEventListener("change", (event) => {
            dateArriveInit.min = dateDepartInit.value;
    });
    dateArriveInit.addEventListener("change", (event) => {
            dateDepartInit.max = dateArriveInit.value;
    })

    changerEtatFermer.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtaGlobalCargo(changerEtatFermer.dataset.numerocargo!, "FERMER");
        dbQuery.setDB(DB);
        changerEtatOuvert.classList.remove("opacity-50" ,"cursor-not-allowed");
        changerEtatFermer.classList.add("opacity-50" ,"cursor-not-allowed");
        filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
        paginationObject.setItems(filterListeCargaison);
        updateCagaisonTable();
        onFilterBar();
        onClickPaginationNav();
        onClickVoirPlus();
        onClickInfoCargaison();
    })
    changerEtatOuvert.addEventListener("click", async (event:Event) => {
        DB = await dbQuery.changerEtaGlobalCargo(changerEtatFermer.dataset.numerocargo!, "OUVERT");
        dbQuery.setDB(DB);
        changerEtatOuvert.classList.add("opacity-50" ,"cursor-not-allowed");
        changerEtatFermer.classList.remove("opacity-50" ,"cursor-not-allowed");
        filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
        paginationObject.setItems(filterListeCargaison);
        updateCagaisonTable();
        onFilterBar();
        onClickPaginationNav();
        onClickVoirPlus();
        onClickInfoCargaison();
    })

})()