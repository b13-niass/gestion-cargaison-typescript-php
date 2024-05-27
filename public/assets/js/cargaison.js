import { DAO } from "./Model/DAO.js";
import { DbQuery } from "./Model/DbQuery.js";
import { Pagination } from "./Model/Pagination.js";
import { FormHandler } from "./Model/CargoFormHandler.js";
import { CargaisonBuilder } from "./Model/CargaisonBuilder.js";
import { Maritime } from "./Model/Maritime.js";
import { Routiere } from "./Model/Routiere.js";
import { Aerienne } from "./Model/Aerienne.js";
(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB = await dao.getData();
    const dbQuery = new DbQuery(DB);
    const AddCargaisonForm = document.getElementById("AddCargaisonForm");
    const listeCargaisonContent = document.getElementById("listeCargaisonContent");
    const filterBars = document.querySelectorAll(".filter-bar");
    const mapContainer = document.getElementById("mapContainer");
    const myMapDialog = document.getElementById("my-map-dialog");
    const showMyMap = document.getElementById("show-my-map");
    const btnCloseMap = document.querySelector(".btn-close-map");
    const btnEnregistrer = document.getElementById("btnEnregistrer");
    const formAddCargo = document.getElementById("formAddCargo");
    const volumeChange = document.getElementById("volume");
    const volumeContent = document.getElementById("volumeContent");
    const formAddCargoHandle = new FormHandler("#formAddCargo");
    let filterListeCargaison = [];
    let filterOptions = {};
    let infoSupp = {};
    let btnEnregistrerStatus = false;
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
    function generateRandomCode() {
        // Function to generate a random number within a specified range
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Function to generate a random uppercase letter
        function getRandomLetter() {
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
    /** Initialisation **/
    filterListeCargaison = dbQuery.filterForCargaison(filterOptions);
    paginationObject.setItems(filterListeCargaison);
    updateCagaisonTable();
    onFilterBar();
    onClickPaginationNav();
    // btnEnregistrer.disabled = btnEnregistrerStatus;
    /** Event Declaration **/
    mapContainer.addEventListener("click", (event) => {
        myMapDialog.classList.add("modal-open");
    });
    btnCloseMap.addEventListener("click", (event) => {
        myMapDialog.classList.remove("modal-open");
        if (localStorage.getItem("infoSupp")) {
            infoSupp = { ...JSON.parse(localStorage.getItem("infoSupp")) };
            if (Object.keys(infoSupp).length != 4) {
                document.getElementById("mapContainer")?.classList.add("error");
            }
        }
    });
    formAddCargoHandle.handleSubmit((d) => {
        let cargaison;
        if (d.typec == "maritime") {
            cargaison = new CargaisonBuilder(new Maritime());
        }
        else if (d.typec == "routiere") {
            cargaison = new CargaisonBuilder(new Routiere());
        }
        else if (d.typec == "aerienne") {
            cargaison = new CargaisonBuilder(new Aerienne());
        }
        cargaison.withDuree(d.duration)
            .withPoidsMax(isNaN(parseInt(d.poidsMax)) ? 0 : parseInt(d.poidsMax))
            .withDistance(d.distance)
            .withEtatAvancement("EN ATTENTE")
            .withEtatGlobal("OUVERT")
            .withImage("https://placehold.co/500")
            .withNbrProduitMax(isNaN(parseInt(d.nbrProduitMax)) ? 0 : parseInt(d.nbrProduitMax))
            .withTypec(d.typec)
            .withLieuDepart(d.cityName1)
            .withLieuArrive(d.cityName2)
            .withMontantTotal(1000)
            .withDateDepart(d.dateDepart)
            .withDateArrive("2024-10-01")
            .withNumero(generateRandomCode());
    });
    volumeChange.addEventListener("change", (event) => {
        if (volumeChange.value == "poids") {
            volumeContent.innerHTML = `<label for="poidsMax" class="block text-sm font-medium text-gray-700">Poids</label>
                <input type="text" id="poidsMax" name="poidsMax" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>`;
        }
        else if (volumeChange.value == "nbrProduit") {
            volumeContent.innerHTML = `<label for="nbrProduitMax" class="block text-sm font-medium text-gray-700">Nbre de produits</label>
                <input type="text" id="nbrProduitMax" name="nbrProduitMax" class="form-control mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="error-message">error</span>`;
        }
        else {
            volumeContent.innerHTML = '';
        }
    });
})();
