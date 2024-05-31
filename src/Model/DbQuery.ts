import {DBStructure, FraisTransport, ICargaison, IColi, IProduit} from "../Interface/DataBinding.js";
import {Cargaison} from "./Cargaison";
import {Maritime} from "./Maritime.js";
import {Routiere} from "./Routiere.js";
import {Aerienne} from "./Aerienne.js";
import {DAO} from "./DAO.js";
import {Client} from "./Client.js";
import {Produit} from "./Produit.js";
import {Fragile} from "./Fragile.js";
import {Incassable} from "./Incassable.js";
import {Alimentaire} from "./Alimentaire.js";
import {Chimique} from "./Chimique.js";

export class DbQuery{
    private dao: DAO;
    constructor(private DB: DBStructure) {
        this.dao = new DAO();
    }

    setDB(DB: DBStructure){
        this.DB = DB;
    }
    /** Début Ges-cargaison **/
    findAllTypeCargaison(): Cargaison[] {
        let maritime: Cargaison[] = this.DB.cargaison.maritime.values.map((c) => new Maritime(c));
        let routiere: Cargaison[] = this.DB.cargaison.routiere.values.map((c) => new Routiere(c));
        let aerienne: Cargaison[] = this.DB.cargaison.aerienne.values.map((c) => new Aerienne(c));
        return maritime.concat(routiere).concat(aerienne);
    }

    findAllTypeCargaisonInterfaces(): ICargaison[] {
        let maritime: ICargaison[] = this.DB.cargaison.maritime.values;
        let routiere: ICargaison[] = this.DB.cargaison.routiere.values;
        let aerienne: ICargaison[] = this.DB.cargaison.aerienne.values;
        return maritime.concat(routiere).concat(aerienne);
    }

    findAllMaritime(): Cargaison[]{
        return this.DB.cargaison.maritime.values.map((c) => new Maritime(c));
    }

    findAllRoutiere(): Cargaison[]{
        return this.DB.cargaison.routiere.values.map((c) => new Routiere(c));
    }

    findAllAerienne(): Cargaison[]{
        return this.DB.cargaison.aerienne.values.map((c) => new Aerienne(c));
    }

    findMaritimeByNumero(id: string): Cargaison{
        return new Maritime(this.DB.cargaison.maritime.values.find((c) => c.numero === id));
    }

    findRoutiereByNumero(id: string): Cargaison{
        return new Routiere(this.DB.cargaison.routiere.values.find((c) => c.numero === id));
    }

    findAerienneByNumero(id: string): Cargaison{
        return new Aerienne(this.DB.cargaison.aerienne.values.find((c) => c.numero === id));
    }

    findInAllByNumero(numero: string): Cargaison{
        if (this.findMaritimeByNumero(numero)){
            return this.findMaritimeByNumero(numero)
        }else if(this.findAerienneByNumero(numero)){
            return this.findAerienneByNumero(numero);
        }else {
            return this.findRoutiereByNumero(numero);
        }
    }

    filterForCargaisonMaritime(filterOptions:Record<string, any>): Cargaison[]{
        const result: Cargaison[] = [];
        this.DB.cargaison.maritime.values.filter((c) => {
            let m:Record<string, any> = new Maritime(c);
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                    cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                result.push(new Maritime(c));
            }
        })
        return result;
    }
    filterForCargaisonRoutiere(filterOptions:Record<string, any>): Cargaison[]{
        const result: Cargaison[] = [];
        this.DB.cargaison.routiere.values.filter((c) => {
            let m:Record<string, any> = new Routiere(c);
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                      cptFind ++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                 result.push(new Routiere(c));
             }
        })
        return result;
    }
    filterForCargaisonAerienne(filterOptions:Record<string, any>): Cargaison[]{
        const result: Cargaison[] = [];
        this.DB.cargaison.aerienne.values.filter((c) => {
            let m:Record<string, any> = new Aerienne(c);
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                     cptFind++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                 result.push(new Aerienne(c));
             }
        })
        return result;
    }
    filterForAllCargaison(filterOptions:Record<string, any>): Cargaison[]{
        let result: Cargaison[] = [];
        this.findAllTypeCargaison().filter(c => {
            let m:Record<string, any> = c;
            let cptFind : number = 0;
            for (const filterOptionsKey in filterOptions) {
                // console.log(m[filterOptionsKey].toLowerCase())
                // console.log(filterOptions[filterOptionsKey].toLowerCase())
                if (m[filterOptionsKey].toLowerCase().includes(filterOptions[filterOptionsKey].toLowerCase())){
                    cptFind ++;
                }
            }
            if (cptFind == Object.keys(filterOptions).length){
                 result.push(c);
             }
        })
        return result;
    }


    filterForCargaison(filterOptions:Record<string, any>): Cargaison[]{
        let result:Cargaison[] = [];
        if (Object.keys(filterOptions).length == 0){
            result = this.findAllTypeCargaison();
        }else {
            if(Object.keys(filterOptions).some(key => key == "typec")){
                if (filterOptions.typec == "routiere"){
                    result = this.filterForCargaisonRoutiere(filterOptions);
                }else if (filterOptions.typec == "maritime"){
                    result =  this.filterForCargaisonMaritime(filterOptions);
                }else if (filterOptions.typec == "aerienne"){
                    result =  this.filterForCargaisonAerienne(filterOptions);
                }
            }else {
                result =  this.filterForAllCargaison(filterOptions);
            }
        }
        return result;
    }

    async addMaritime(cargaison: ICargaison): Promise<DBStructure>{
        this.DB.cargaison.maritime.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }
    async addRoutiere(cargaison: ICargaison): Promise<DBStructure>{
        this.DB.cargaison.routiere.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }
    async addAerienne(cargaison: ICargaison): Promise<DBStructure>{
        this.DB.cargaison.aerienne.values.push(cargaison);
        const newDB = await this.dao.postData(this.DB);
        return newDB;
    }

    async addCargaison(cargaison: ICargaison): Promise<DBStructure>{
        let result : DBStructure;
        if (cargaison.typec == "maritime"){
            result = await this.addMaritime(cargaison);
        }else if(cargaison.typec == "aerienne"){
            result = await this.addAerienne(cargaison);
        }else if(cargaison.typec == "routiere"){
            result = await this.addRoutiere(cargaison);
        }
        return result!;
    }

    /** Fin Ges-cargaison **/

    findAllClient(): Client[]{
        const result: Client[] = [];
        this.findAllTypeCargaisonInterfaces().forEach((cargaison) => {
            if (Object.keys(cargaison).some((key) => key == "coli")) {
                cargaison.coli?.forEach(c => {
                    result.push(new Client(c.expediteur))
                    result.push(new Client(c.destinataire))
                }) ;
            }
        })
       return result;
    }

    findClientByTel(tel: string): Client | undefined{
        return this.findAllClient().find(c => c.getTelephone() == tel);
    }

    findAllProduit(): Produit[]{
        const result: Produit[] = [];
        this.findAllTypeCargaisonInterfaces().forEach((cargaison) => {
            if (Object.keys(cargaison).some((key) => key == "coli")) {
                cargaison.coli!.forEach((coli) => {
                    coli.produits!.forEach((p) => {
                        if (p.typep == "fragile"){
                            result.push(new Fragile(p));
                        }else if (p.typep == "incassable"){
                            result.push(new Incassable(p));
                        }else if (p.typep == "alimentaire"){
                            result.push(new Alimentaire(p));
                        }else if (p.typep == "chimique"){
                            result.push(new Chimique(p));
                        }
                    })
                })
            }
        })
        return result;
    }

    findAllFragile(): Fragile[] {
        return this.findAllProduit().filter(p => p.constructor.name == "Fragile");
    }

    findAllAlimentaire(): Alimentaire[] {
        return this.findAllProduit().filter(p => p.constructor.name == "Alimentaire");
    }

    findAllChimique(): Chimique[] {
        return this.findAllProduit().filter(p => p.constructor.name == "Chimique");
    }

    findAllIncassable(): Incassable[] {
        return this.findAllProduit().filter(p => p.constructor.name == "Incassable");
    }

    findAllColi(): IColi[]{
        const result: IColi[] = [];
        this.findAllTypeCargaisonInterfaces().forEach((cargaison) => {
            if (Object.keys(cargaison).some((key) => key == "coli")) {
                cargaison.coli?.forEach(c => {
                    result.push(c);
                })
            }
        })
        return result;
    }

    findColiByCode(code: string): IColi|undefined{
        return this.findAllColi().find(coli => coli.code == code)
    }

    findProduitByCode(code: string): Produit|undefined{
        return this.findAllProduit().find(p => p.getCode() == code)
    }

    findCargoByColi(codeColi: string): Cargaison|undefined{
        const coli: IColi|undefined = this.findAllColi().find(coli => coli.code == codeColi);
        if (coli)
           return this.findAllTypeCargaison().find((cargo) => cargo.getNumeros() == coli.produits![0].cargaison)
        else
            return undefined;
    }

    findAllProduitByCargo(codeCargo: string): IProduit[]{
        let cargo: ICargaison | undefined = this.findAllTypeCargaisonInterfaces().find(c => c.numero == codeCargo);
        let result: IProduit[] = [];
        if (cargo){
            if (Object.keys(cargo).some(key => key == "coli")){
                cargo.coli?.forEach(c => {
                    c.produits!.forEach(p => {
                        result.push(p);
                    });
                })
            }
        }
        console.log(result);
        return result;
    }

    isCargaisonOpened(numero: string):boolean{
        const result : Cargaison|undefined = this.findAllTypeCargaison().find(c => c.getNumeros() == numero && c.getEtatGlobal() == "OUVERT");
        return !!result;
    }

    isCargaisonClosed(numero: string):boolean{
        const result : Cargaison|undefined = this.findAllTypeCargaison().find(c => c.getNumeros() == numero && c.getEtatGlobal() == "FERMER");
        return !!result;
    }

    isCargaisonEnAttente(numero : string): boolean {
        const result : Cargaison|undefined = this.findAllTypeCargaison().find(c => c.getNumeros() == numero && c.getEtatAvancement() == "EN ATTENTE");
        return !!result;
    }

    isCargaisonEnCours(numero : string): boolean {
        const result : Cargaison|undefined = this.findAllTypeCargaison().find(c => c.getNumeros() == numero && c.getEtatAvancement() == "EN COURS");
        return !!result;
    }

    isCargaisonTerminer(numero : string): boolean {
        const result : Cargaison|undefined = this.findAllTypeCargaison().find(c => c.getNumeros() == numero && c.getEtatAvancement() == "TERMINER");
        return !!result;
    }

    isProduitForThisCargo(produit: Produit, cargaison: Cargaison){
        let valid: boolean = false;
        let cargo: ICargaison|undefined = this.findAllTypeCargaisonInterfaces().find(c => c.numero == cargaison.getNumeros());
        if(cargo && cargo.typec == "maritime"){
            for (let c1 of this.DB.cargaison.maritime.produitsAccepter) {
                if (c1 == produit.getType()){
                    valid = true;
                }
            }
        }else if(cargo && cargo.typec == "aerienne"){
            for (let c1 of this.DB.cargaison.aerienne.produitsAccepter) {
                if (c1 == produit.getType()){
                    valid = true;
                }
            }
        }else{
            for (let c1 of this.DB.cargaison.aerienne.produitsAccepter) {
                if (c1 == produit.getType()){
                    valid = true;
                }
            }
        }
        return valid;
    }

    comptVolumeContentCargo(codeCargo: string): number{
        let cargo: ICargaison | undefined = this.findAllTypeCargaisonInterfaces().find(c => c.numero == codeCargo);
        let cpt: number = 0;
        if(cargo){
            if (cargo.nbrProduitMax! > 0){
                if (Object.keys(cargo).some(key => key == "coli")){
                    cargo.coli?.forEach(c => {
                        cpt += c.produits?.length!;
                    })
                }
            }else {
                if (Object.keys(cargo).some(key => key == "coli")){
                    cargo.coli?.forEach(c => {
                        c.produits?.forEach(p => {
                            cpt += p.poids!;
                        })
                    })
                }
            }
        }
        return cpt;
    }

    isCargoFull(codeCargo: string):boolean{
        let cargo: ICargaison | undefined = this.findAllTypeCargaisonInterfaces().find(c => c.numero == codeCargo);
        if(cargo){
            if (cargo.nbrProduitMax){
                let cpt = 0;
                if (Object.keys(cargo).some(key => key == "coli")){
                    cargo.coli?.forEach(c => {
                        cpt += c.produits?.length!;
                    })
                    return cpt >= cargo.nbrProduitMax!;
                }
            }else {
                let cpt = 0;
                if (Object.keys(cargo).some(key => key == "coli")){
                    cargo.coli?.forEach(c => {
                        c.produits?.forEach(p => {
                            cpt += p.poids!;
                        })
                    })
                    return cpt >= cargo.poidsMax!;
                }
            }
            return false
        }else{
            return false;
        }
    }

     getAllFrais(typec: string): FraisTransport[]{
        if (typec == "routiere"){
            return this.DB.cargaison.routiere.fraisTransport;
        }else if(typec == "maritime"){
            return this.DB.cargaison.maritime.fraisTransport;
        }else{
            return this.DB.cargaison.aerienne.fraisTransport;
        }
    }

    calculerFrais(produit: IProduit, cargaison: ICargaison): number {
        const frais: FraisTransport = this.getAllFrais(cargaison.typec!).find((frais) => frais.typep == produit.typep) as FraisTransport;
        console.log(frais)
        return ((produit.poids as number  / frais.poids) * (cargaison.distance as number/ frais.param) * frais.tarif)+frais.autreFrais;
    }


    getCargoMontant(codeCargo: string): number{
        let cargo: ICargaison = this.findAllTypeCargaisonInterfaces().find(c => c.numero == codeCargo)!;
        let somme: number = 0;
        // console.log(1)
        this.findAllProduitByCargo(codeCargo).forEach((produit) => {
           let result: number = this.calculerFrais(produit, cargo)
            if (result < 10000) result = 10000;
            somme += result;
        })
        return somme;
    }

    getMontantColi(code: string): number{
        const cargo = (this.findCargoByColi(code)! as unknown) as ICargaison;
        const coli = this.findColiByCode(code)!
        let somme: number = 0;
        coli.produits?.forEach(produit => {
            let mtn = this.calculerFrais(produit, cargo)
            if (mtn < 10000) mtn = 10000
            somme+=mtn;
        })
        return somme;
    }

   async changerEtaGlobalCargo(codeCargo: string, etat: string): Promise<DBStructure>{
        const cargaison = this.findAllTypeCargaisonInterfaces().find(c => c.numero == codeCargo)!;
        if (cargaison.typec == "maritime") {
            this.DB.cargaison.maritime.values.map(c => {
                if (c.numero == codeCargo){
                    c.etatGlobal = etat;
                    return c;
                }
            })
        }
        else if (cargaison.typec == "routiere") {
            this.DB.cargaison.routiere.values.map(c => {
                if (c.numero == codeCargo){
                    c.etatGlobal = etat;
                    return c;
                }
            })

        }else {
            this.DB.cargaison.aerienne.values.map(c => {
                if (c.numero == codeCargo){
                    c.etatGlobal = etat;
                }
                return c;
            })
        }
       return await this.dao.postData(this.DB);
    }

    async changerEtatAvancementCargo(codeCargo: string, etat: string): Promise<DBStructure>{
            const cargaison = this.findAllTypeCargaisonInterfaces().find(c => c.numero == codeCargo)!;
            if (cargaison.typec == "maritime") {
            this.DB.cargaison.maritime.values.map(c => {
                if (c.numero == codeCargo){
                    c.etatAvancement = etat;
                    return c;
                }
            })
        }
    else if (cargaison.typec == "routiere") {
            this.DB.cargaison.routiere.values.map(c => {
                if (c.numero == codeCargo){
                    c.etatAvancement = etat;
                    return c;
                }
            })

        }else {
            this.DB.cargaison.aerienne.values.map(c => {
                if (c.numero == codeCargo){
                    c.etatAvancement = etat;
                }
                return c;
            })
        }
        return await this.dao.postData(this.DB);
    }

    async changerStatusProduit(produit: Produit, etat: string): Promise<DBStructure>{
        const cargaison = this.findAllTypeCargaisonInterfaces().find(c => c.numero == produit.getCargaison())!;
        if (cargaison.typec == "maritime") {
            this.DB.cargaison.maritime.values.forEach((c1, key) => {
                if (c1.numero == cargaison.numero){
                    this.DB.cargaison.maritime.values[key].coli!.forEach((coliValue, key2) => {
                        this.DB.cargaison.maritime.values[key].coli![key2].produits?.map(produit => {
                            if (produit.code == produit.code){
                                produit.status = etat
                            }
                            return produit;
                        })
                    })
                }
            })
        }
        else if (cargaison.typec == "routiere") {
            this.DB.cargaison.routiere.values.forEach((c1, key) => {
                if (c1.numero == cargaison.numero){
                    this.DB.cargaison.routiere.values[key].coli!.forEach((coliValue, key2) => {
                        this.DB.cargaison.routiere.values[key].coli![key2].produits?.map(produit => {
                            if (produit.code == produit.code){
                                produit.status = etat
                            }
                            return produit;
                        })
                    })
                }
            })

        }else {
            this.DB.cargaison.aerienne.values.forEach((c1, key) => {
                if (c1.numero == cargaison.numero){
                    this.DB.cargaison.aerienne.values[key].coli!.forEach((coliValue, key2) => {
                        this.DB.cargaison.aerienne.values[key].coli![key2].produits?.map(produit => {
                            if (produit.code == produit.code){
                                produit.status = etat
                            }
                            return produit;
                        })
                    })
                }
            })
        }
        return await this.dao.postData(this.DB);
    }

    async addProduitToCargaison(numero: string, coli: IColi): Promise<DBStructure>{
        const cargaison = this.findAllTypeCargaisonInterfaces().find(c => c.numero == numero)!;
        if (cargaison.typec == "maritime"){
            this.DB.cargaison.maritime.values.forEach((cargo, key) => {
                if (cargo.numero == numero){
                    if (this.DB.cargaison.maritime.values[key].coli == undefined)
                    {
                        this.DB.cargaison.maritime.values[key]["coli"] = [];
                    }
                    this.DB.cargaison.maritime.values[key].coli!.push(coli)
                }
            })
        }else if (cargaison.typec == "routiere"){
            this.DB.cargaison.routiere.values.forEach((cargo, key) => {
                if (cargo.numero == numero){
                    if (this.DB.cargaison.maritime.values[key].coli == undefined)
                    {
                        this.DB.cargaison.maritime.values[key]["coli"] = [];
                    }
                    this.DB.cargaison.maritime.values[key].coli!.push(coli)
                }
            })
        }else if (cargaison.typec == "aerienne"){
            this.DB.cargaison.aerienne.values.forEach((cargo, key) => {
                if (cargo.numero == numero){
                    if (this.DB.cargaison.maritime.values[key].coli == undefined)
                    {
                        this.DB.cargaison.maritime.values[key]["coli"] = [];
                    }
                    this.DB.cargaison.maritime.values[key].coli!.push(coli)
                }
            })
        }
        return await this.dao.postData(this.DB);
    }
}