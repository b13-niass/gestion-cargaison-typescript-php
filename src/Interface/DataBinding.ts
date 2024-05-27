export interface FraisTransport {
    typep: number;
    tarif: number;
    poids: number;
    param: number;
    autreFrais: number;
}

export interface ICargaison{
     numero?: string;
     poidsMax?: number;
     nbrProduitMax?: number;
     montantTotal?: number;
     lieuDepart?: string;
     lieuArrive?: string;
     dateDepart?: string;
     dateArrive?: string;
     duree?: number;
     typec?: string;
     image?: string;
     distance?: number;
     etatAvancement?: string;
     etatGlobal?: string;
}

export interface ICargoStructure {
    produitsAccepter: string[];
    fraisTransport: FraisTransport[];
    values: ICargaison[];
}

export interface IProduit {

}

export interface IProdStructures {
    alimentaire: any[];
    chimique: any[];
    materiel: {
        incassable: any[];
        fragile: any[];
    };
}

export interface DBStructure {
    cargaison: {
        maritime: ICargoStructure;
        routiere: ICargoStructure;
        aerienne: ICargoStructure;
    };
    // produits: IProdStructures;
}