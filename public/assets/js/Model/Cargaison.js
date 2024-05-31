import { FormatDate } from "./FormatDate.js";
export class Cargaison {
    numero;
    poidsMax;
    nbrProduitMax;
    montantTotal;
    lieuDepart;
    lieuArrive;
    dateDepart;
    dateArrive;
    duree;
    typec;
    image;
    distance;
    etatAvancement;
    etatGlobal;
    // protected coli?: IColi[];
    constructor(init) {
        Object.assign(this, init);
    }
    getNumeros() {
        return this.numero;
    }
    setNumeros(numero) {
        this.numero = numero;
    }
    getPoidsMax() {
        return this.poidsMax;
    }
    setPoidsMax(poidsMax) {
        this.poidsMax = poidsMax;
    }
    getNbrProduitMax() {
        return this.nbrProduitMax;
    }
    setNbrProduitMax(nbrProduitMax) {
        this.nbrProduitMax = nbrProduitMax;
    }
    getMontantTotal() {
        return this.montantTotal;
    }
    setMontantTotal(montantTotal) {
        this.montantTotal = montantTotal;
    }
    getLieuDepart() {
        return this.lieuDepart;
    }
    setLieuDepart(lieuDepart) {
        this.lieuDepart = lieuDepart;
    }
    getLieuArrive() {
        return this.lieuArrive;
    }
    setLieuArrive(lieuArrive) {
        this.lieuArrive = lieuArrive;
    }
    getDateDepart() {
        return this.dateDepart;
    }
    setDateDepart(dateDepart) {
        this.dateDepart = dateDepart;
    }
    getDateArrive() {
        return this.dateArrive;
    }
    setDateArrive(dateArrive) {
        this.dateArrive = dateArrive;
    }
    getDuree() {
        return this.duree;
    }
    setDuree(duree) {
        this.duree = duree;
    }
    getTypec() {
        return this.typec;
    }
    setTypec(typec) {
        this.typec = typec;
    }
    getImage() {
        return this.image;
    }
    setImage(image) {
        this.image = image;
    }
    getDistance() {
        return this.distance;
    }
    setDistance(distance) {
        this.distance = distance;
    }
    getEtatAvancement() {
        return this.etatAvancement;
    }
    setEtatAvancement(etatAvancement) {
        this.etatAvancement = etatAvancement;
    }
    getEtatGlobal() {
        return this.etatGlobal;
    }
    setEtatGlobal(etatGlobal) {
        this.etatGlobal = etatGlobal;
    }
    convertMinutesToHours(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} h-${remainingMinutes}min`;
    }
    info() {
        const formatDate = new FormatDate();
        const tr = document.createElement("tr");
        tr.className = "tr-hoverable border-b";
        tr.innerHTML = `
         <td class="border border-gray-400 w-24 px-4 py-2">
            <img src="https://via.placeholder.com/50" alt="Product Image" class="rounded">
        </td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.typec}</td>
        <td class="border border-gray-400 px-4 py-2">
            <span class="inline-block bg-blue-200 text-blue-800 text-sm px-2 rounded-full">${this.poidsMax == 0 ? this.nbrProduitMax + "produits" : this.poidsMax + "Kg"}</span>
        </td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${formatDate.formatDate3(this.dateDepart) + " au " + formatDate.formatDate3(this.dateArrive)}</td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.lieuDepart} - ${this.lieuArrive}</td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.distance}</td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.convertMinutesToHours(this.duree)}</td>
        <td class="border border-gray-400 px-4 py-2">
            <span class="inline-block ${(this.etatAvancement == "EN ATTENTE") ? "bg-gray-200" : (this.etatAvancement == "EN COURS") ? "bg-orange-200" : "bg-green-200"}  text-green-800 font-bold text-[0.7rem] px-2 rounded-full">${this.etatAvancement}</span>
        </td>
         <td class="border border-gray-400 px-4 py-2">
            <span class="inline-block ${this.etatGlobal == "OUVERT" ? "bg-green-200" : "bg-red-200"} text-green-800 font-bold text-[0.7rem] px-2 rounded-full">${this.etatGlobal}</span>
        </td>
        <td class="flex flex-col gap-y-3 border border-gray-400 px-4 py-2">
           <a href="#" data-detailcargoInfo="${this.numero}" class="text-[0.8rem] text-center bg-gray-300 text-white py-1 px-1 border border-gray-800 rounded">
                État Cargo
            </a>
            <a href="#" data-detailcargo="${this.numero}" class="${this.etatGlobal == "FERMER" ? "hidden" : ""} text-[0.8rem] text-center bg-gray-800 text-white py-1 px-1 border border-transparent rounded">
                Add Coli
            </a>
        </td>
        `;
        return tr;
    }
}
