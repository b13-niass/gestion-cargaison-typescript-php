import {DAO} from "./Model/DAO.js";
import {DBStructure} from "./Interface/DataBinding.js";
import {DbQuery} from "./Model/DbQuery.js";
import {Cargaison} from "./Model/Cargaison.js";
import {Pagination} from "./Model/Pagination.js";
import {FormHandler} from "./Model/CargoFormHandler.js";
(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB: DBStructure = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const AddCargaisonForm  = document.getElementById("AddCargaisonForm") as HTMLFormElement;
    const listeCargaisonContent  = document.getElementById("listeCargaisonContent") as HTMLDivElement;
    const filterBars = document.querySelectorAll(".filter-bar") as NodeListOf<HTMLInputElement>;
    const mapContainer = document.getElementById("mapContainer") as HTMLDivElement;
    const myMapDialog = document.getElementById("my-map-dialog") as HTMLDivElement;
    const showMyMap = document.getElementById("show-my-map") as HTMLDivElement;
    const btnCloseMap = document.querySelector(".btn-close-map") as HTMLButtonElement;
    const btnEnregistrer = document.getElementById("btnEnregistrer") as HTMLButtonElement;
    const formAddCargo = document.getElementById("formAddCargo") as HTMLButtonElement;
    const volumeChange = document.getElementById("volume") as HTMLSelectElement;
    const volumeContent = document.getElementById("volumeContent") as HTMLDivElement;
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
            })
        })
    }

    /** Initialisation **/
    filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
    paginationObject.setItems(filterListeCargaison);
    updateCagaisonTable();
    onFilterBar();
    onClickPaginationNav();

    // btnEnregistrer.disabled = btnEnregistrerStatus;

    /** Event Declaration **/

    mapContainer.addEventListener("click", (event: Event) => {
        myMapDialog.classList.add("modal-open");

    })
    btnCloseMap.addEventListener("click", (event: Event) => {
        myMapDialog.classList.remove("modal-open");

        if (localStorage.getItem("infoSupp")){
            infoSupp = {...JSON.parse(localStorage.getItem("infoSupp")!) as Record<string, any>}
            if (Object.keys(infoSupp).length != 4){
                document.getElementById("mapContainer")?.classList.add("error");
            }
        }
    })

    formAddCargoHandle.handleSubmit((d) => {
        console.log(d);
    })

    volumeChange.addEventListener("change", (event: Event)=>{
        if (volumeChange.value == "poids"){
            volumeContent.innerHTML = `<label for="poidsMax" class="block text-sm font-medium text-gray-700">Poids</label>
                <input type="text" id="poidsMax" name="poidsMax" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>`;
        }else if(volumeChange.value == "nbrProduit"){
            volumeContent.innerHTML = `<label for="nbrProduitMax" class="block text-sm font-medium text-gray-700">Nbre de produits</label>
                <input type="text" id="nbrProduitMax" name="nbrProduitMax" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>`;
        }else {
            volumeContent.innerHTML = '';
        }
    })

    })()