export class CargaisonBuilder {
    cargaison;
    constructor(cargaison) {
        this.cargaison = cargaison;
    }
    withNumero(numero) {
        this.cargaison.setNumeros(numero);
        return this;
    }
    withPoidsMax(poidsMax) {
        this.cargaison.setPoidsMax(poidsMax);
        return this;
    }
    withNbrProduitMax(nbrProduitMax) {
        this.cargaison.setNbrProduitMax(nbrProduitMax);
        return this;
    }
    withMontantTotal(montantTotal) {
        this.cargaison.setMontantTotal(montantTotal);
        return this;
    }
    withDepartX(departX) {
        this.cargaison.setDepartX(departX);
        return this;
    }
    withDepartY(departY) {
        this.cargaison.setDepartY(departY);
        return this;
    }
    withArriveX(arriveX) {
        this.cargaison.setArriveX(arriveX);
        return this;
    }
    withArriveY(arriveY) {
        this.cargaison.setArriveY(arriveY);
        return this;
    }
    withTypec(typec) {
        this.cargaison.setTypec(typec);
        return this;
    }
    withImage(image) {
        this.cargaison.setImage(image);
        return this;
    }
    withDistance(distance) {
        this.cargaison.setDistance(distance);
        return this;
    }
    withEtatAvancement(etatAvancement) {
        this.cargaison.setEtatAvancement(etatAvancement);
        return this;
    }
    withEtatGlobal(etatGlobal) {
        this.cargaison.setEtatGlobal(etatGlobal);
        return this;
    }
    build() {
        return this.cargaison;
    }
}
