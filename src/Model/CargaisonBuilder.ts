import {Cargaison} from "./Cargaison.js";

export class CargaisonBuilder<T extends Cargaison> {
    protected cargaison: T;

    constructor(cargaison: T) {
        this.cargaison = cargaison;
    }
    withNumero(numero: string): CargaisonBuilder<T> {
        this.cargaison.setNumeros(numero);
        return this;
    }
    withPoidsMax(poidsMax: number): CargaisonBuilder<T> {
        this.cargaison.setPoidsMax(poidsMax);
        return this;
    }
    withNbrProduitMax(nbrProduitMax: number): CargaisonBuilder<T> {
        this.cargaison.setNbrProduitMax(nbrProduitMax);
        return this;
    }
    withMontantTotal(montantTotal: number): CargaisonBuilder<T> {
        this.cargaison.setMontantTotal(montantTotal);
        return this;
    }
    withDepartX(duree: number): CargaisonBuilder<T> {
        this.cargaison.setDuree(duree);
        return this;
    }

    withTypec(typec: string): CargaisonBuilder<T> {
        this.cargaison.setTypec(typec);
        return this;
    }
    withImage(image: string): CargaisonBuilder<T> {
        this.cargaison.setImage(image);
        return this;
    }
    withDistance(distance: number): CargaisonBuilder<T> {
        this.cargaison.setDistance(distance);
        return this;
    }
    withEtatAvancement(etatAvancement: string): CargaisonBuilder<T> {
        this.cargaison.setEtatAvancement(etatAvancement);
        return this;
    }
    withEtatGlobal(etatGlobal: string): CargaisonBuilder<T> {
        this.cargaison.setEtatGlobal(etatGlobal);
        return this;
    }

    build(): T {
        return this.cargaison;
    }

}