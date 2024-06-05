export interface loginInformation{
    email?: string;
    nom?: string;
}

export interface FraisTransport {
    typep: string;
    tarif: number;
    poids: number;
    param: number;
    autreFrais: number;
}

export interface ICargaison {
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
    coli?: IColi[];
}

export interface ICargoStructure {
    produitsAccepter: string[];
    fraisTransport: FraisTransport[];
    values: ICargaison[];
}

// export interface IProdStructures {
//     alimentaire: IProduit[];
//     chimique: IProduit[];
//     materiel: {
//         incassable: IProduit[];
//         fragile: IProduit[];
//     };
// }

export interface IGestionnaire{
    email?: string;
    password?: string;
    nom?: string;
}
export interface ILogin{
    email?: string;
    password?: string;
    formulaires?: string;
}


export interface DBStructure {
    cargaison: {
        maritime: ICargoStructure;
        routiere: ICargoStructure;
        aerienne: ICargoStructure;
        produitsretirer?: IColi[];
    };
    gestionnaire: IGestionnaire[];
}

export interface ISubmitCargaison {
    cityName1?: string,
    cityName2?: string,
    dateDepart?: string,
    dateArrive?: string,
    distance?: number,
    duration?: number,
    nbrProduitMax?: string,
    poidsMax?: string,
    typec?: string,
    volume?: string
}

export interface IProduit{
    code?: string;
    libelle?: string;
    typep?: string;
    poids?: number;
    cargaison?: string;
    toxicite?: string;
    status?: string;
}

export interface IColi{
    code?: string;
    produits?: IProduit[];
    expediteur?: IClientStructures;
    destinataire?: IClientStructures;
}

export interface IClientStructures{
    nom?: string;
    prenom?: string;
    telephone?: string;
    email?: string;
    ville?: string;
    pays?: string;
    code?: string;
}