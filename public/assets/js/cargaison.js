import { DAO } from "./Model/DAO.js";
import { DbQuery } from "./Model/DbQuery.js";
import { Pagination } from "./Model/Pagination.js";
(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const AddCargaisonForm = document.getElementById("AddCargaisonForm");
    const listeCargaisonContent = document.getElementById("listeCargaisonContent");
    const filterBars = document.querySelectorAll(".filter-bar");
    let filterListeCargaison = [];
    let filterOptions = {};
    const paginationObject = new Pagination(filterListeCargaison, 3);
    /** Function Declaration **/
    const updateCagaisonTable = () => {
        const tbody = document.getElementById("listeCargaisonContent");
        tbody.innerHTML = '';
        paginationObject.getPageItems().forEach((cargo, index) => {
            const tr = cargo.info();
            tbody.appendChild(tr);
        });
        paginationObject.makeFooter();
    };
    const onFilterBar = () => {
        filterBars.forEach((filterBar) => {
            filterBar.addEventListener("input", (event) => {
                // Object.keys(filterOptions).some(key => key == filterBar.name)
                if (!filterBar.value) {
                    delete filterOptions[filterBar.name];
                }
                else {
                    filterOptions[filterBar.name] = filterBar.value;
                }
                // console.log(filterOptions)
                filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
                paginationObject.setItems(filterListeCargaison);
                paginationObject.goToPage(1);
                updateCagaisonTable();
                onClickPaginationNav();
            });
        });
    };
    const onClickPaginationNav = () => {
        const btnsPaginate = document.querySelectorAll("[data-paginate]");
        btnsPaginate.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                paginationObject.goToPage(parseInt(btn.dataset.paginate));
                updateCagaisonTable();
                onClickPaginationNav();
            });
        });
    };
    /** Initialisation **/
    filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
    paginationObject.setItems(filterListeCargaison);
    updateCagaisonTable();
    onFilterBar();
    onClickPaginationNav();
    /** Event Declaration **/
})();
