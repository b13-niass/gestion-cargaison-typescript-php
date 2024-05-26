import {DAO} from "./Model/DAO.js";
import {DBStructure} from "./Interface/DataBinding.js";
import {DbQuery} from "./Model/DbQuery.js";
import {Cargaison} from "./Model/Cargaison.js";
import {Pagination} from "./Model/Pagination.js";

(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB: DBStructure = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const AddCargaisonForm  = document.getElementById("AddCargaisonForm") as HTMLFormElement;
    const listeCargaisonContent  = document.getElementById("listeCargaisonContent") as HTMLDivElement;
    const filterBars = document.querySelectorAll(".filter-bar") as NodeListOf<HTMLInputElement>;

    let filterListeCargaison: Cargaison[] = [];
    let filterOptions:Record<string, any> = {};
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

    /** Event Declaration **/




})()