import {FormatDate} from "./FormatDate.js";
import {IClientStructures} from "../Interface/DataBinding.js";

export class Client {
    private nom?: string;
    private prenom?: string;
    private telephone?: string;
    private email?: string;
    private ville?: string;
    private pays?: string;
    private code?: string;

    constructor(init?: Partial<IClientStructures>) {
        Object.assign(this, init);
    }
    setNom(nom: string): void {
        this.nom = nom
    }
    getNom(): string {
        return this.nom!;
    }
    setPrenom(prenom: string): void {
        this.prenom = prenom
    }
    getPrenom(): string {
        return this.prenom!;
    }
    setTelephone(tel: string): void {
        this.telephone = tel
    }
    getTelephone(): string {
        return this.telephone!;
    }
    setEmail(email: string): void {
        this.email = email
    }
    getEmail(): string{
        return this.email!;
    }
    setVille(ville: string): void {
        this.ville = ville
    }
    getVille(): string {
        return this.ville!;
    }
    setPays(pays: string): void {
        this.pays = pays
    }
    getPays(): string {
        return this.pays!;
    }
    setCode(code: string): void{
        this.code = code;
    }
    getCode(): string {
        return this.code!;
    }
}