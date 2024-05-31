import {ICargaison, IColi} from "../Interface/DataBinding.js";
import {FormatDate} from "./FormatDate.js";

export abstract class Cargaison {

    protected numero?: string;
    protected poidsMax?: number;
    protected nbrProduitMax?: number;
    protected montantTotal?: number;
    protected lieuDepart?: string;
    protected lieuArrive?: string;
    protected dateDepart?: string;
    protected dateArrive?: string;
    protected duree?: number;
    protected typec?: string;
    protected image?: string;
    protected distance?: number;
    protected etatAvancement?: string;
    protected etatGlobal?: string;
    // protected coli?: IColi[];

    constructor(init?: Partial<ICargaison>) {
        Object.assign(this, init);
    }

    getNumeros(): string {
        return this.numero!;
    }
    setNumeros(numero: string){
        this.numero = numero;
    }
    getPoidsMax(): number {
        return this.poidsMax!;
    }
    setPoidsMax(poidsMax: number){
        this.poidsMax = poidsMax;
    }
    getNbrProduitMax(): number {
        return this.nbrProduitMax!;
    }
    setNbrProduitMax(nbrProduitMax: number){
        this.nbrProduitMax = nbrProduitMax;
    }
    getMontantTotal(): number {
        return this.montantTotal!;
    }
    setMontantTotal(montantTotal: number){
        this.montantTotal = montantTotal;
    }
    getLieuDepart(): string {
        return this.lieuDepart!;
    }
    setLieuDepart(lieuDepart: string){
        this.lieuDepart = lieuDepart;
    }
    getLieuArrive(): string {
        return this.lieuArrive!;
    }
    setLieuArrive(lieuArrive: string){
        this.lieuArrive = lieuArrive;
    }
    getDateDepart(): string {
        return this.dateDepart!;
    }
    setDateDepart(dateDepart: string){
        this.dateDepart = dateDepart;
    }
    getDateArrive(): string {
        return this.dateArrive!;
    }
    setDateArrive(dateArrive: string){
        this.dateArrive = dateArrive;
    }
    getDuree(): number {
        return this.duree!;
    }
    setDuree(duree: number){
        this.duree = duree;
    }

    getTypec(): string {
        return this.typec!;
    }

    setTypec(typec: string){
        this.typec = typec;
    }

    getImage(): string {
        return this.image!;
    }
    setImage(image: string){
        this.image = image;
    }
    getDistance(): number {
        return this.distance!;
    }
    setDistance(distance: number){
        this.distance = distance;
    }
    getEtatAvancement(): string {
        return this.etatAvancement!;
    }
    setEtatAvancement(etatAvancement: string){
        this.etatAvancement = etatAvancement;
    }
    getEtatGlobal(): string {
        return this.etatGlobal!;
    }
    setEtatGlobal(etatGlobal: string){
        this.etatGlobal = etatGlobal;
    }
    convertMinutesToHours(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} h-${remainingMinutes}min`;
    }

    info(): HTMLTableRowElement {
        const formatDate = new FormatDate();
        const tr: HTMLTableRowElement = document.createElement("tr");
        tr.className = "tr-hoverable border-b";
        tr.innerHTML = `
         <td class="border border-gray-400 w-24 px-4 py-2">
            <img src="https://via.placeholder.com/50" alt="Product Image" class="rounded">
        </td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.typec}</td>
        <td class="border border-gray-400 px-4 py-2">
            <span class="inline-block bg-blue-200 text-blue-800 text-sm px-2 rounded-full">${this.poidsMax == 0? this.nbrProduitMax +"produits" : this.poidsMax+"Kg"}</span>
        </td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${formatDate.formatDate3(this.dateDepart!) +" au "+formatDate.formatDate3(this.dateArrive!)}</td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.lieuDepart} - ${this.lieuArrive}</td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.distance}</td>
        <td class="border border-gray-400 text-gray-900 px-4 py-2">${this.convertMinutesToHours(this.duree!)}</td>
        <td class="border border-gray-400 px-4 py-2">
            <span class="inline-block ${(this.etatAvancement == "EN ATTENTE")? "bg-gray-200":(this.etatAvancement == "EN COURS")?"bg-orange-200":"bg-green-200"}  text-green-800 font-bold text-[0.7rem] px-2 rounded-full">${this.etatAvancement}</span>
        </td>
         <td class="border border-gray-400 px-4 py-2">
            <span class="inline-block ${this.etatGlobal == "OUVERT"? "bg-green-200":"bg-red-200"} text-green-800 font-bold text-[0.7rem] px-2 rounded-full">${this.etatGlobal}</span>
        </td>
        <td class="flex flex-col gap-y-3 border border-gray-400 px-4 py-2">
           <a href="#" data-detailcargoInfo="${this.numero}" class="text-[0.8rem] text-center bg-gray-300 text-white py-1 px-1 border border-gray-800 rounded">
                État Cargo
            </a>
            <a href="#" data-detailcargo="${this.numero}" class="${ this.etatGlobal == "FERMER" ? "hidden":""} text-[0.8rem] text-center bg-gray-800 text-white py-1 px-1 border border-transparent rounded">
                Add Coli
            </a>
        </td>
        `;
        return tr;
    }

}